import type { App, Page, PageFrontmatter } from "@vuepress/core";
import type { GitData } from "@vuepress/plugin-git";
import type { AuthorInfo } from "vuepress-shared/node";
import {
  getAuthor,
  getCategory,
  getPageExcerpt,
  getPageText,
  isAbsoluteUrl,
  isArray,
  isFunction,
  isPlainObject,
  isUrl,
} from "vuepress-shared/node";

import { getPageRenderContent } from "./content.js";
import type { Feed } from "../generator/feed.js";
import type {
  FeedAuthor,
  FeedCategory,
  FeedContributor,
  FeedEnclosure,
  FeedFrontmatterOption,
  FeedGetter,
  FeedItemInformation,
  FeedOptions,
  FeedPluginFrontmatter,
} from "../typings/index.js";
import { getImageMineType, resolveUrl } from "../utils/index.js";

export class FeedInfo {
  private pageOptions: FeedFrontmatterOption;
  private frontmatter: PageFrontmatter<FeedPluginFrontmatter>;
  private base: string;
  private getter: FeedGetter;
  private isPreservedElement: (tagName: string) => boolean;

  constructor(
    private app: App,
    private options: FeedOptions,
    private page: Page<
      { excerpt?: string; git?: GitData },
      FeedPluginFrontmatter
    >,
    private feed: Feed,
  ) {
    this.base = this.app.options.base;
    this.frontmatter = page.frontmatter;
    this.getter = options.getter || {};
    this.pageOptions = this.frontmatter.feed || {};
    this.isPreservedElement = (tagName): boolean => {
      const { preservedElements } = this.options;

      return isArray(preservedElements)
        ? preservedElements.some((item) =>
            item instanceof RegExp ? item.test(tagName) : item === tagName,
          )
        : isFunction(preservedElements)
        ? preservedElements(tagName)
        : false;
    };
  }

  get title(): string {
    if (isFunction(this.getter.title)) return this.getter.title(this.page);

    return this.pageOptions.title || this.page.title;
  }

  /** real url */
  get link(): string {
    if (isFunction(this.getter.link)) return this.getter.link(this.page);

    return resolveUrl(this.options.hostname, this.base, this.page.path);
  }

  get description(): string | null {
    if (isFunction(this.getter.description))
      return this.getter.description(this.page);

    if (this.pageOptions.description) return this.pageOptions.description;

    if (this.frontmatter.description) return this.frontmatter.description;

    const pageText = getPageText(this.page);

    return pageText.length > 180 ? `${pageText.slice(0, 177)}...` : pageText;
  }

  get author(): FeedAuthor[] {
    if (isFunction(this.getter.author)) return this.getter.author(this.page);

    if (isArray(this.pageOptions.author)) return this.pageOptions.author;

    if (isPlainObject(this.pageOptions.author))
      return [this.pageOptions.author];

    return this.frontmatter.author === false
      ? []
      : this.frontmatter.author
      ? getAuthor(this.frontmatter.author)
      : this.options.channel?.author
      ? getAuthor(<AuthorInfo>this.options.channel?.author)
      : [];
  }

  get category(): FeedCategory[] | null {
    if (isFunction(this.getter.category))
      return this.getter.category(this.page);

    if (isArray(this.pageOptions.category)) return this.pageOptions.category;

    if (isPlainObject(this.pageOptions.category))
      return [this.pageOptions.category];

    const { categories, category = categories } = this.frontmatter;

    return getCategory(category).map((item) => ({ name: item }));
  }

  get enclosure(): FeedEnclosure | null {
    if (isFunction(this.getter.enclosure))
      return this.getter.enclosure(this.page);

    if (this.image)
      return {
        url: this.image,
        type: getImageMineType(this.image.split(".").pop()),
      };

    return null;
  }

  get guid(): string {
    return this.pageOptions.guid || this.link;
  }

  get pubDate(): Date | null {
    if (isFunction(this.getter.publishDate))
      return this.getter.publishDate(this.page);

    const { time, date = time } = this.page.frontmatter;

    const { createdTime } = this.page.data.git || {};

    return date && date instanceof Date
      ? date
      : createdTime
      ? new Date(createdTime)
      : null;
  }

  get lastUpdated(): Date {
    if (isFunction(this.getter.lastUpdateDate))
      return this.getter.lastUpdateDate(this.page);

    const { updatedTime } = this.page.data.git || {};

    return updatedTime ? new Date(updatedTime) : new Date();
  }

  get excerpt(): string | null {
    if (isFunction(this.getter.excerpt)) return this.getter.excerpt(this.page);

    if (this.pageOptions.summary) return this.pageOptions.summary;

    return getPageExcerpt(this.app, this.page, {
      isCustomElement: this.isPreservedElement,
    });
  }

  get content(): string {
    if (isFunction(this.getter.content)) return this.getter.content(this.page);

    if (this.pageOptions.content) return this.pageOptions.content;

    return getPageRenderContent(this.app, this.page, this.isPreservedElement);
  }

  get image(): string | null {
    if (isFunction(this.getter.image)) return this.getter.image(this.page);

    const { banner, cover } = this.frontmatter;

    if (banner) {
      if (isAbsoluteUrl(banner))
        return resolveUrl(this.options.hostname, this.app.options.base, banner);

      if (isUrl(banner)) return banner;
    }

    if (cover) {
      if (isAbsoluteUrl(cover))
        return resolveUrl(this.options.hostname, this.app.options.base, cover);

      if (isUrl(cover)) return cover;
    }

    const result = /!\[.*?\]\((.*?)\)/iu.exec(this.page.content);

    if (result) {
      if (isAbsoluteUrl(result[1]))
        return resolveUrl(
          this.options.hostname,
          this.app.options.base,
          result[1],
        );

      if (isUrl(result[1])) return result[1];
    }

    return null;
  }

  get contributor(): FeedContributor[] {
    if (isFunction(this.getter.contributor))
      return this.getter.contributor(this.page);

    if (isArray(this.pageOptions.contributor))
      return this.pageOptions.contributor;

    if (isPlainObject(this.pageOptions.contributor))
      return [this.pageOptions.contributor];

    return this.author;
  }

  get copyright(): string | null {
    if (isFunction(this.getter.copyright))
      return this.getter.copyright(this.page);

    if (this.frontmatter.copyright) return this.frontmatter.copyright;
    const firstAuthor = this.author[0];

    if (firstAuthor?.name) return `Copyright by ${firstAuthor.name}`;

    return null;
  }

  getFeedItem(): FeedItemInformation | null {
    const {
      author,
      category,
      content,
      contributor,
      copyright,
      description,
      enclosure,
      excerpt,
      guid,
      image,
      lastUpdated,
      link,
      pubDate,
      title,
    } = this;

    // we need at least title or description
    if (!title && !description) return null;

    // add category to feed
    if (category) category.forEach((item) => this.feed.addCategory(item.name));

    // add contributor to feed
    if (contributor)
      contributor.forEach((item) => this.feed.addContributor(item));

    return {
      title,
      link,
      guid,
      lastUpdated,
      content,
      author,
      contributor,
      ...(description ? { description } : {}),
      ...(excerpt ? { summary: excerpt } : {}),
      ...(category ? { category } : {}),
      ...(enclosure ? { enclosure } : {}),
      ...(pubDate ? { pubDate } : {}),
      ...(image ? { image } : {}),
      ...(copyright ? { copyright } : {}),
    };
  }
}

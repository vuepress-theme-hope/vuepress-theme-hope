import {
  getAuthor,
  getCategory,
  isAbsoluteUrl,
  isUrl,
} from "@mr-hope/vuepress-shared";
import { getImageMineType, resolveHTML, resolveUrl } from "./utils";

import type { BaseThemeConfig } from "@mr-hope/vuepress-shared";
import type { App, Page, PageFrontmatter } from "@vuepress/core";
import type { GitData } from "@vuepress/plugin-git";
import type { Feed } from "./feed";
import type {
  FeedAuthor,
  FeedCategory,
  FeedContributor,
  FeedEnclosure,
  FeedItemOption,
  FeedOptions,
  FeedFrontmatterOption,
  FeedPluginFrontmatter,
} from "./types";

export class FeedPage {
  private feedOption: FeedFrontmatterOption;
  private frontmatter: PageFrontmatter<FeedPluginFrontmatter>;
  private base: string;
  private themeConfig: BaseThemeConfig;

  constructor(
    private page: Page & { git?: GitData },
    private feed: Feed,
    private options: FeedOptions,
    private app: App
  ) {
    this.frontmatter =
      page.frontmatter as PageFrontmatter<FeedPluginFrontmatter>;
    this.feedOption = this.frontmatter.feed || {};
    this.base = this.app.options.base;
    this.themeConfig = this.app.options.themeConfig as BaseThemeConfig;
  }

  get title(): string {
    return this.feedOption.title || this.page.title;
  }

  /** real url */
  get link(): string {
    return resolveUrl(this.options.hostname, this.base, this.page.path);
  }

  get description(): string | undefined {
    if (this.feedOption.description) return this.feedOption.description;

    if (this.frontmatter.description) return this.frontmatter.description;

    if (this.page.excerpt)
      return resolveHTML(this.app.markdown.render(this.page.excerpt));

    return undefined;
  }

  get author(): FeedAuthor[] {
    if (Array.isArray(this.feedOption.author)) return this.feedOption.author;

    if (typeof this.feedOption.author === "object")
      return [this.feedOption.author];

    return this.frontmatter.author === false
      ? []
      : getAuthor(this.frontmatter, this.themeConfig).map((item) => ({
          name: item,
        }));
  }

  get category(): FeedCategory[] | undefined {
    if (Array.isArray(this.feedOption.category))
      return this.feedOption.category;

    if (typeof this.feedOption.category === "object")
      return [this.feedOption.category];

    const { categories, category = categories } = this.frontmatter;

    return getCategory(category).map((item) => ({ name: item }));
  }

  get enclosure(): FeedEnclosure | undefined {
    if (this.image)
      return {
        url: this.image,
        type: getImageMineType(this.image.split(".").pop() as string),
      };

    return undefined;
  }

  get guid(): string {
    return this.feedOption.guid || this.link;
  }

  get pubDate(): Date | undefined {
    const { time, date = time } = this.page.frontmatter;

    const { createdTime } = this.page.git || {};

    return date && date instanceof Date
      ? date
      : createdTime
      ? new Date(createdTime)
      : undefined;
  }

  get lastUpdated(): Date {
    const { updatedTime } = this.page.git || {};

    return updatedTime ? new Date(updatedTime) : new Date();
  }

  get content(): string {
    if (this.feedOption.content) return this.feedOption.content;

    return resolveHTML(this.page.contentRendered);
  }

  get image(): string | undefined {
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
          result[1]
        );

      if (isUrl(result[1])) return result[1];
    }

    return undefined;
  }

  get contributor(): FeedContributor[] {
    if (Array.isArray(this.feedOption.contributor))
      return this.feedOption.contributor;

    if (typeof this.feedOption.contributor === "object")
      return [this.feedOption.contributor];

    return this.author;
  }

  get copyright(): string | undefined {
    if (this.frontmatter.copyrightText) return this.frontmatter.copyrightText;
    const firstAuthor = this.author[0];

    if (firstAuthor && firstAuthor.name)
      return `Copyright by ${firstAuthor.name}`;

    return undefined;
  }

  getFeedItem(): FeedItemOption | false {
    const {
      author,
      category,
      content,
      contributor,
      copyright,
      description,
      enclosure,
      guid,
      image,
      lastUpdated,
      link,
      pubDate,
      title,
    } = this;

    // we need at least title or description
    if (!title && !description) return false;

    // add category to feed
    if (category) category.forEach((item) => this.feed.addCategory(item.name));

    // add contributor to feed
    if (contributor)
      contributor.forEach((item) => this.feed.addContributor(item));

    return {
      title,
      link,
      description,
      author,
      category,
      enclosure,
      guid,
      pubDate,
      lastUpdated,
      content,
      image,
      contributor,
      copyright,
    };
  }
}

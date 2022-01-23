import {
  getAuthor,
  getCategory,
  isAbsoluteUrl,
  isUrl,
} from "@mr-hope/vuepress-shared";
import { getImageMineType, resolveHTML, resolveUrl } from "./utils";

import type { AuthorInfo } from "@mr-hope/vuepress-shared";
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
} from "../shared";

export class FeedPage {
  private pageFeedOptions: FeedFrontmatterOption;
  private frontmatter: PageFrontmatter<FeedPluginFrontmatter>;
  private base: string;

  constructor(
    private page: Page & { git?: GitData },
    private feed: Feed,
    private options: FeedOptions,
    private app: App
  ) {
    this.frontmatter =
      page.frontmatter as PageFrontmatter<FeedPluginFrontmatter>;
    this.pageFeedOptions = this.frontmatter.feed || {};
    this.base = this.app.options.base;
  }

  get title(): string {
    return this.pageFeedOptions.title || this.page.title;
  }

  /** real url */
  get link(): string {
    return resolveUrl(this.options.hostname, this.base, this.page.path);
  }

  get description(): string | undefined {
    if (this.pageFeedOptions.description)
      return this.pageFeedOptions.description;

    if (this.frontmatter.description) return this.frontmatter.description;

    if (this.page.excerpt)
      return resolveHTML(this.app.markdown.render(this.page.excerpt));

    return undefined;
  }

  get author(): FeedAuthor[] {
    if (Array.isArray(this.pageFeedOptions.author))
      return this.pageFeedOptions.author;

    if (typeof this.pageFeedOptions.author === "object")
      return [this.pageFeedOptions.author];

    return this.frontmatter.author === false
      ? []
      : this.frontmatter.author
      ? getAuthor(this.frontmatter.author)
      : this.options.channel?.author
      ? getAuthor(this.options.channel?.author as AuthorInfo)
      : [];
  }

  get category(): FeedCategory[] | undefined {
    if (Array.isArray(this.pageFeedOptions.category))
      return this.pageFeedOptions.category;

    if (typeof this.pageFeedOptions.category === "object")
      return [this.pageFeedOptions.category];

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
    return this.pageFeedOptions.guid || this.link;
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
    if (this.pageFeedOptions.content) return this.pageFeedOptions.content;

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
    if (Array.isArray(this.pageFeedOptions.contributor))
      return this.pageFeedOptions.contributor;

    if (typeof this.pageFeedOptions.contributor === "object")
      return [this.pageFeedOptions.contributor];

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

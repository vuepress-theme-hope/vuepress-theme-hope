import {
  getImageMineType,
  isAbsoluteUrl,
  isUrl,
  resolveHTML,
  resolveUrl,
} from "./utils";

import type {
  Context,
  Page,
  PageComputed,
  PageFrontmatter,
} from "@mr-hope/vuepress-types";
import type { Feed } from "./feed";
import type {
  FeedAuthor,
  FeedCategory,
  FeedContributor,
  FeedEnclosure,
  FeedItemOption,
  FeedOptions,
  FeedFrontmatterOption,
} from "../types";

export class FeedPage {
  private feedOption: FeedFrontmatterOption;
  private frontmatter: PageFrontmatter;

  constructor(
    private $page: PageComputed,
    private feed: Feed,
    private options: FeedOptions,
    private context: Context
  ) {
    this.frontmatter = $page.frontmatter;
    this.feedOption = this.frontmatter.feed || {};
  }

  /** Get current page */
  private get page(): Page {
    return this.context.pages.find(
      (page) => page.key === this.$page.key
    ) as Page;
  }

  get title(): string {
    return this.feedOption.title || this.$page.title;
  }

  /** real url */
  get link(): string {
    return resolveUrl(
      this.options.hostname,
      this.context.base,
      this.$page.path
    );
  }

  get description(): string | undefined {
    if (this.feedOption.description) return this.feedOption.description;

    if (this.frontmatter.description) return this.frontmatter.description;

    if (this.$page.excerpt)
      return resolveHTML(this.context.markdown.render(this.$page.excerpt).html);

    return undefined;
  }

  get author(): FeedAuthor[] {
    if (Array.isArray(this.feedOption.author)) return this.feedOption.author;

    if (typeof this.feedOption.author === "object")
      return [this.feedOption.author];

    const { author } = this.$page.frontmatter;
    const { author: globalAuthor } = this.context.themeConfig;

    return [{ name: author === false ? "" : author || globalAuthor || "" }];
  }

  get category(): FeedCategory[] | undefined {
    if (Array.isArray(this.feedOption.category))
      return this.feedOption.category;

    if (typeof this.feedOption.category === "object")
      return [this.feedOption.category];

    const { category } = this.frontmatter;

    return category ? [{ name: category }] : [];
  }

  get enclosure(): FeedEnclosure | undefined {
    if (this.image)
      return {
        url: this.image,
        type: getImageMineType(this.image.split(".").pop() || ""),
      };

    return undefined;
  }

  get guid(): string {
    return this.feedOption.guid || this.page._permalink || this.link;
  }

  get pubDate(): Date | undefined {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { date, time = date } = this.$page.frontmatter;
    const createTimeStamp = this.$page.createTimeStamp;

    return time instanceof Date
      ? time
      : createTimeStamp
      ? new Date(createTimeStamp)
      : undefined;
  }

  get lastUpdated(): Date {
    const updateTimeStamp = this.$page.updateTimeStamp;

    return updateTimeStamp ? new Date(updateTimeStamp) : new Date();
  }

  get content(): string {
    if (this.feedOption.content) return this.feedOption.content;

    // eslint-disable-next-line no-underscore-dangle
    const { html } = this.context.markdown.render(
      this.page?._strippedContent || ""
    );

    return resolveHTML(html);
  }

  get image(): string | undefined {
    const { image } = this.frontmatter;

    if (image) {
      if (isAbsoluteUrl(image))
        return resolveUrl(this.options.hostname, this.context.base, image);
      if (isUrl(image)) return image;
    }

    const result = /!\[.*?\]\((.*?)\)/iu.exec(
      this.page?._strippedContent || ""
    );

    if (result) {
      if (isAbsoluteUrl(result[1]))
        return resolveUrl(this.options.hostname, this.context.base, result[1]);
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

    if (firstAuthor?.name) return `Copyright by ${firstAuthor.name}`;

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

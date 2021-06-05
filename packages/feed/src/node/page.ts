import {
  getImageMineType,
  isAbsoluteUrl,
  isUrl,
  resolveHTML,
  resolveUrl,
} from "./utils";

import {
  BaseThemeConfig,
  getAuthor,
  getCategory,
} from "@mr-hope/vuepress-shared";
import type { App, Page, PageFrontmatter } from "@vuepress/core";
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
    private $page: Page,
    private feed: Feed,
    private options: FeedOptions,
    private app: App
  ) {
    this.frontmatter = $page.frontmatter;
    this.feedOption = this.frontmatter.feed || {};
    this.base = this.app.options.base;
    this.themeConfig = this.app.options.themeConfig as BaseThemeConfig;
  }

  /** Get current page */
  private get page(): Page {
    return this.app.pages.find((page) => page.key === this.$page.key) as Page;
  }

  get title(): string {
    return this.feedOption.title || this.$page.title;
  }

  /** real url */
  get link(): string {
    return resolveUrl(this.options.hostname, this.base, this.$page.path);
  }

  get description(): string | undefined {
    if (this.feedOption.description) return this.feedOption.description;

    if (this.frontmatter.description) return this.frontmatter.description;

    if (this.$page.excerpt)
      // return resolveHTML(this.app.markdown.render(this.$page.excerpt).html);
      return resolveHTML(this.app.markdown.render(this.$page.excerpt));

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
    // TODO: Add support for permalink
    // return this.feedOption.guid || this.page._permalink || this.link;
    return this.feedOption.guid || this.link;
  }

  get pubDate(): Date | undefined {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { date, time = date } = this.$page.frontmatter;

    return time && time instanceof Date ? time : undefined;
  }

  get lastUpdated(): Date {
    const lastUpdatedTimeStamp = (
      this.$page as Page & {
        lastUpdatedTime: number;
      }
    ).lastUpdatedTime;

    return lastUpdatedTimeStamp ? new Date(lastUpdatedTimeStamp) : new Date();
  }

  get content(): string {
    if (this.feedOption.content) return this.feedOption.content;

    // TODO: Support this
    // // eslint-disable-next-line no-underscore-dangle
    // const { html } = this.app.markdown.render(
    //   this.page?._strippedContent || ""
    // );

    // return resolveHTML(html);

    return this.page.content;
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

    // TODO: Support page image
    // const result = /!\[.*?\]\((.*?)\)/iu.exec(
    //   this.page?._strippedContent || ""
    // );

    // if (result) {
    //   if (isAbsoluteUrl(result[1]))
    //     return resolveUrl(
    //       this.options.hostname,
    //       this.app.options.base,
    //       result[1]
    //     );
    //   if (isUrl(result[1])) return result[1];
    // }

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

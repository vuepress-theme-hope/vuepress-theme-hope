import { getAuthor, getCategory, isAbsoluteUrl, isUrl } from "vuepress-shared";
import { getImageMineType, resolveHTML, resolveUrl } from "./utils";

import type { AuthorInfo } from "vuepress-shared";
import type { App, Page, PageFrontmatter } from "@vuepress/core";
import type { GitData } from "@vuepress/plugin-git";
import type { Feed } from "./feed";
import type {
  FeedAuthor,
  FeedCategory,
  FeedContributor,
  FeedEnclosure,
  FeedGetter,
  FeedItemOption,
  FeedOptions,
  FeedFrontmatterOption,
  FeedPluginFrontmatter,
} from "../shared";

export class FeedPage {
  private pageFeedOptions: FeedFrontmatterOption;
  private frontmatter: PageFrontmatter<FeedPluginFrontmatter>;
  private base: string;
  private getter: FeedGetter;

  constructor(
    private app: App,
    private options: FeedOptions,
    private page: Page<{ git?: GitData }, FeedPluginFrontmatter>,
    private feed: Feed
  ) {
    this.base = this.app.options.base;
    this.frontmatter = page.frontmatter;
    this.getter = options.getter || {};
    this.pageFeedOptions = this.frontmatter.feed || {};
  }

  get title(): string {
    if (typeof this.getter.title === "function")
      return this.getter.title(this.page);

    return this.pageFeedOptions.title || this.page.title;
  }

  /** real url */
  get link(): string {
    if (typeof this.getter.link === "function")
      return this.getter.link(this.page);

    return resolveUrl(this.options.hostname, this.base, this.page.path);
  }

  get description(): string | null {
    if (typeof this.getter.description === "function")
      return this.getter.description(this.page);

    if (this.pageFeedOptions.description)
      return this.pageFeedOptions.description;

    if (this.frontmatter.description) return this.frontmatter.description;

    if (this.page.excerpt)
      return `html:${resolveHTML(
        this.app.markdown.render(this.page.excerpt),
        this.options.customElements
      )}`;

    return null;
  }

  get author(): FeedAuthor[] {
    if (typeof this.getter.author === "function")
      return this.getter.author(this.page);

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

  get category(): FeedCategory[] | null {
    if (typeof this.getter.category === "function")
      return this.getter.category(this.page);

    if (Array.isArray(this.pageFeedOptions.category))
      return this.pageFeedOptions.category;

    if (typeof this.pageFeedOptions.category === "object")
      return [this.pageFeedOptions.category];

    const { categories, category = categories } = this.frontmatter;

    return getCategory(category).map((item) => ({ name: item }));
  }

  get enclosure(): FeedEnclosure | null {
    if (typeof this.getter.enclosure === "function")
      return this.getter.enclosure(this.page);

    if (this.image)
      return {
        url: this.image,
        type: getImageMineType(this.image.split(".").pop() as string),
      };

    return null;
  }

  get guid(): string {
    return this.pageFeedOptions.guid || this.link;
  }

  get pubDate(): Date | null {
    if (typeof this.getter.publishDate === "function")
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
    if (typeof this.getter.lastUpdateDate === "function")
      return this.getter.lastUpdateDate(this.page);

    const { updatedTime } = this.page.data.git || {};

    return updatedTime ? new Date(updatedTime) : new Date();
  }

  get content(): string {
    if (typeof this.getter.content === "function")
      return this.getter.content(this.page);

    if (this.pageFeedOptions.content) return this.pageFeedOptions.content;

    return resolveHTML(this.page.contentRendered, this.options.customElements);
  }

  get image(): string | null {
    if (typeof this.getter.image === "function")
      return this.getter.image(this.page);

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

    return null;
  }

  get contributor(): FeedContributor[] {
    if (typeof this.getter.contributor === "function")
      return this.getter.contributor(this.page);

    if (Array.isArray(this.pageFeedOptions.contributor))
      return this.pageFeedOptions.contributor;

    if (typeof this.pageFeedOptions.contributor === "object")
      return [this.pageFeedOptions.contributor];

    return this.author;
  }

  get copyright(): string | null {
    if (typeof this.getter.copyright === "function")
      return this.getter.copyright(this.page);

    if (this.frontmatter.copyright) return this.frontmatter.copyright;
    const firstAuthor = this.author[0];

    if (firstAuthor?.name) return `Copyright by ${firstAuthor.name}`;

    return null;
  }

  getFeedItem(): FeedItemOption | null {
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
      ...(category ? { category } : {}),
      ...(enclosure ? { enclosure } : {}),
      ...(pubDate ? { pubDate } : {}),
      ...(image ? { image } : {}),
      ...(copyright ? { copyright } : {}),
    };
  }
}

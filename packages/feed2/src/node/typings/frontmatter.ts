import type { BasePageFrontMatter } from "vuepress-shared/node";
import type { FeedAuthor, FeedCategory, FeedContributor } from "./feed.js";

export interface FeedFrontmatterOption {
  /**
   * Feed title
   */
  title?: string;

  /**
   * Feed description
   */
  description?: string;

  /**
   * Feed content
   */
  content?: string;

  /**
   * Feed author
   */
  author?: FeedAuthor[] | FeedAuthor;

  /**
   * Feed contributor
   */
  contributor?: FeedContributor[] | FeedContributor;

  /**
   * Feed category
   */
  category?: FeedCategory[] | FeedCategory;

  /**
   * @description guid should be unique globally
   */
  guid?: string;
}

export interface FeedPluginFrontmatter extends BasePageFrontMatter {
  /**
   * Feed plugin options
   */
  feed?: FeedFrontmatterOption | false;
}

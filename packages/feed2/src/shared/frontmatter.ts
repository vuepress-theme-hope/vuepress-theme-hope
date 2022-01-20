import type { BasePageFrontMatter } from "@mr-hope/vuepress-shared";
import type { FeedAuthor, FeedContributor, FeedCategory } from "./feed";

export interface FeedFrontmatterOption {
  /**
   * @default true
   */
  enable?: boolean;
  title?: string;
  description?: string;
  content?: string;
  author?: FeedAuthor[] | FeedAuthor;
  contributor?: FeedContributor[] | FeedContributor;
  category?: FeedCategory[] | FeedCategory;
  guid?: string;
}

export interface FeedPluginFrontmatter extends BasePageFrontMatter {
  feed?: FeedFrontmatterOption;
}

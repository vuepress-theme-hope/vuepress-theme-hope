import type { PageFrontmatter } from "@vuepress/client";

export interface BasePageFrontMatter extends PageFrontmatter {
  /** Page icon */
  icon?: string;
  /** Page Author(s) */
  author?: string[] | string | false;
  /** Whether the content is original */
  original?: boolean;
  /**
   * Page Category(ies)
   */
  category?: string | string[];
  /**
   * @deprecated use `date` instead
   */
  time?: Date | string;
  /**
   * @deprecated use `category` instead
   */
  categories?: string[];
  /**
   * Page Tag(s)
   */
  tag?: string[] | string;
  /**
   * @deprecated use `tag` instead
   */
  tags?: string[];
  /**
   * Whether the page is an article
   */
  article?: boolean;
  /**
   * Page Cover
   */
  cover?: string;
  /**
   * Page Banner
   */
  banner?: string;
  /**
   * 页脚文字
   */
  footer?: string | boolean;
  /**
   * 版权文字
   */
  copyrightText?: string | false;
}

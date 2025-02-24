import type { ReadingTime } from "@vuepress/plugin-reading-time";
import type { Author } from "vuepress-shared";

export type PageType = "article" | "home" | "slide" | "page";

export interface PageInfoData extends Record<string, unknown> {
  /**
   * Article title
   */
  title: string;

  /**
   * Article short title
   */
  shortTitle: string;

  /**
   * Page icon
   */
  icon?: string;

  /**
   * Whether this page should be indexed
   *
   * used in other functions, e.g.: sidebar and catalog
   */
  index?: boolean;

  /**
   * The order of this page in same directory
   */
  order?: number;
}

export interface ArticleInfoData extends PageInfoData {
  /**
   * Type
   */
  type: PageType;

  /**
   * Article author
   */
  author?: Author | false;

  /**
   * Writing date info
   */
  date?: number;

  /**
   * Writing date info in current language
   */
  localizedDate?: string;

  /**
   * Article category
   */
  category?: string[];

  /**
   * Article tag
   */
  tag?: string[];

  /**
   * Reading time info
   */
  readingTime?: ReadingTime;

  /**
   * Article excerpt
   */
  excerpt: string;

  /**
   * Whether is encrypted
   */
  isEncrypted?: true;

  /**
   * Whether is original
   */
  isOriginal?: true;

  /**
   * Sticky info
   */
  sticky?: number | boolean;

  /**
   * Cover image
   */
  cover?: string;
}

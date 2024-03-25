import type { ReadingTime } from "@vuepress/plugin-reading-time";
import type { Author } from "vuepress-shared";

export const enum PageInfo {
  title = "t",
  shortTitle = "s",
  icon = "i",
  index = "I",
  order = "O",
  breadcrumbExclude = "b",
}

export const enum ArticleInfo {
  type = "y",
  author = "a",
  date = "d",
  localizedDate = "l",
  category = "c",
  tag = "g",
  isEncrypted = "n",
  isOriginal = "o",
  readingTime = "r",
  excerpt = "e",
  sticky = "u",
  cover = "v",
}

export const enum PageType {
  article = "a",
  home = "h",
  slide = "s",
  page = "p",
}

export interface PageInfoData extends Record<string, unknown> {
  /**
   * Article title
   */
  [PageInfo.title]: string;

  /**
   * Article short title
   */
  [PageInfo.shortTitle]: string;

  /**
   * Page icon
   */
  [PageInfo.icon]?: string;

  /**
   * Whether this page should be indexed
   *
   * used in other functions, e.g.: sidebar and catalog
   */
  [PageInfo.index]?: boolean;

  /**
   * The order of this page in same directory
   */
  [PageInfo.order]?: number;
}

export interface ArticleInfoData extends PageInfoData {
  /**
   * Type
   */
  [ArticleInfo.type]: PageType;

  /**
   * Article author
   */
  [ArticleInfo.author]?: Author | false;

  /**
   * Writing date info
   */
  [ArticleInfo.date]?: number;

  /**
   * Writing date info in current language
   */
  [ArticleInfo.localizedDate]?: string;

  /**
   * Article category
   */
  [ArticleInfo.category]?: string[];

  /**
   * Article tag
   */
  [ArticleInfo.tag]?: string[];

  /**
   * Reading time info
   */
  [ArticleInfo.readingTime]?: ReadingTime;

  /**
   * Article excerpt
   */
  [ArticleInfo.excerpt]: string;

  /**
   * Whether is encrypted
   */
  [ArticleInfo.isEncrypted]?: true;

  /**
   * Whether is original
   */
  [ArticleInfo.isOriginal]?: true;

  /**
   * Sticky info
   */
  [ArticleInfo.sticky]?: number | boolean;

  /**
   * Cover image
   */
  [ArticleInfo.cover]?: string;
}

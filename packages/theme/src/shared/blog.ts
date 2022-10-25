import type { ReadingTime } from "vuepress-plugin-reading-time2";
import type { Author } from "vuepress-shared";

export const enum ArticleInfoType {
  type = "y",
  title = "t",
  shortTitle = "s",
  icon = "i",
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

export interface ArticleInfo extends Record<string, unknown> {
  /**
   * Type
   */
  [ArticleInfoType.type]: PageType;

  /**
   * Article title
   */
  [ArticleInfoType.title]: string;

  /**
   * Article short title
   */
  [ArticleInfoType.shortTitle]: string;

  /**
   * Page icon
   */
  [ArticleInfoType.icon]?: string;

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

  /**
   * Article author
   */
  [ArticleInfoType.author]?: Author | false;

  /**
   * writing date info
   */
  [ArticleInfoType.date]?: Date;

  /**
   * writing date info in currect language
   */
  [ArticleInfoType.localizedDate]?: string;

  /**
   * article category
   */
  [ArticleInfoType.category]?: string[];

  /**
   * Article tag
   */
  [ArticleInfoType.tag]?: string[];

  /**
   * Reading time info
   */
  [ArticleInfoType.readingTime]?: ReadingTime;

  /**
   * article excerpt
   */
  [ArticleInfoType.excerpt]: string;

  /**
   * Whether is encrypted
   */
  [ArticleInfoType.isEncrypted]?: true;

  /**
   * Whether is original
   */
  [ArticleInfoType.isOriginal]?: true;

  /**
   * Sticky info
   */
  [ArticleInfoType.sticky]?: number | boolean;

  /**
   * Cover image
   */
  [ArticleInfoType.cover]?: string;
}

import type { ReadingTime } from "vuepress-plugin-reading-time2";
import type { Author } from "vuepress-shared";

export const TYPE = "y";
export const TITLE = "t";
export const SHORT_TITLE = "s";
export const ICON = "i";
export const AUTHOR = "a";
export const DATE = "d";
export const LOCALIZED_DATE = "l";
export const CATEGORY = "c";
export const TAG = "g";
export const IS_ENCRYPTED = "n";
export const IS_ORIGINAL = "o";
export const READING_TIME = "r";
export const EXCERPT = "e";
export const STICKY = "u";
export const COVER = "v";

export enum PageType {
  Article = "a",
  Home = "h",
  Slide = "s",
  Page = "p",
}

export interface ArticleInfo extends Record<string, unknown> {
  /**
   * Type
   */
  type: PageType;

  /**
   * Article title
   */
  [TITLE]: string;

  /**
   * Article short title
   */
  [SHORT_TITLE]: string;

  /**
   * Page icon
   */
  [ICON]?: string;

  /**
   * Article author
   */
  [AUTHOR]?: Author | false;

  /**
   * writing date info
   */
  [DATE]?: Date;

  /**
   * writing date info in currect language
   */
  [LOCALIZED_DATE]?: string;

  /**
   * article category
   */
  [CATEGORY]?: string[];

  /**
   * Article tag
   */
  [TAG]?: string[];

  /**
   * Reading time info
   */
  [READING_TIME]?: ReadingTime;

  /**
   * article excerpt
   */
  [EXCERPT]: string;

  /**
   * Whether is encrypted
   */
  [IS_ENCRYPTED]?: true;

  /**
   * Whether is original
   */
  [IS_ORIGINAL]?: true;

  /**
   * Sticky info
   */
  [STICKY]?: number | boolean;

  /**
   * Cover image
   */
  [COVER]?: string;
}

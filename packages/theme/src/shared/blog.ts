import type { Author } from "@mr-hope/vuepress-shared";
import type { ReadingTime } from "vuepress-plugin-reading-time2";

export interface ArticleInfo extends Record<string, unknown> {
  /**
   * Type
   */
  type: "article" | "page" | "slide";

  /**
   * Whether is encrypted
   */
  isEncrypted?: boolean;

  /**
   * Whether is original
   */
  isOriginal?: boolean;

  /**
   * Article title
   */
  title: string;

  /**
   * Page icon
   */
  icon?: string;

  /**
   * Article author
   */
  author?: Author | false;

  /**
   * writing date info
   */
  date?: Date;

  /**
   * article category
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
   * article excerpt
   */
  excerpt: string;

  /**
   * Sticky info
   */
  sticky?: number | boolean;

  /**
   * Start info
   */
  star?: number | boolean;

  /**
   * Cover image
   */
  cover?: string;
}

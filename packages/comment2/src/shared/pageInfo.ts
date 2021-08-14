import type { ResolvedLocaleConfig } from "@mr-hope/vuepress-shared";

export interface PageInfoI18nConfig {
  /**
   * 作者文字
   *
   * Author label text
   */
  author: string;

  /**
   * 写作日期文字
   *
   * Writing date label text
   */
  date: string;

  /**
   * 标记原创的文字
   *
   * Label text marked as original
   */
  origin: string;

  /**
   * 访问量文字
   *
   * Page views label text
   */
  views: string;

  /**
   * 标签文字
   *
   * Tag label text
   */
  tag: string;

  /**
   * 分类文字
   *
   * Category label text
   */
  category: string;

  /**
   * 期望阅读时间文字
   *
   * Expect reading time label text
   */
  readingTime: string;

  /**
   * 文章字数
   *
   * Words label Text
   */
  words: string;
}

export type PageInfoLocaleConfig = ResolvedLocaleConfig<PageInfoI18nConfig>;

/**
 * 页面信息类型
 *
 * Type of page infomation
 */
export type PageInfoType =
  | "Author"
  | "Category"
  | "Date"
  | "PageView"
  | "Tag"
  | "ReadingTime"
  | "Word";

import type { ConvertLocaleConfig } from "@mr-hope/vuepress-shared";

export interface PageInfoLocaleData {
  /**
   * Author label text
   *
   * 作者文字
   */
  author: string;

  /**
   * Writing date label text
   *
   * 写作日期文字
   */
  date: string;

  /**
   * Label text marked as original
   *
   * 标记原创的文字
   */
  origin: string;

  /**
   * Page views label text
   *
   * 访问量文字
   */
  views: string;

  /**
   * Tag label text
   *
   * 标签文字
   */
  tag: string;

  /**
   * Category label text
   *
   * 分类文字
   */
  category: string;

  /**
   * Expect reading time label text
   *
   * 期望阅读时间文字
   */
  readingTime: string;

  /**
   * Words label Text
   *
   * 文章字数
   */
  words: string;
}

export type PageInfoLocaleConfig = ConvertLocaleConfig<PageInfoLocaleData>;

/**
 * Type of page infomation
 *
 * 页面信息类型
 */
export type PageInfo =
  | "Author"
  | "Category"
  | "Date"
  | "PageView"
  | "Tag"
  | "ReadingTime"
  | "Word";

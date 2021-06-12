import type { ResolvedLocaleConfig } from "@mr-hope/vuepress-shared";

export interface PageInfoI18nConfig {
  /** 作者 */
  author: string;
  /** 写作日期 */
  date: string;
  /** 原创文字 */
  origin: string;
  /** 访问量 */
  views: string;
  /** 标签文字 */
  tag: string;
  /** 分类文字 */
  category: string;
  /** 阅读时间 */
  readingTime: string;
  /** 文章字数 */
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

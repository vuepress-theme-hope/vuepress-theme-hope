export interface PageInfoI18nConfig {
  /** 作者 */
  author: string;
  /** 写作日期 */
  time: string;
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

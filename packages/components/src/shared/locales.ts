import type { ConvertLocaleConfig } from "@mr-hope/vuepress-shared";

export interface ArticleInfoLocaleData {
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

export type ArticleInfoLocaleConfig =
  ConvertLocaleConfig<ArticleInfoLocaleData>;

export interface BackToTopLocaleData {
  /**
   * Back to top button label text
   *
   * 返回顶部文字
   */
  backToTop: string;
}

export type BackToTopLocaleConfig = ConvertLocaleConfig<BackToTopLocaleData>;

export interface PaginationLocaleData {
  /**
   * Previous page button label text
   *
   * 上一页文字
   */
  prev: string;

  /**
   * Next page button label text
   *
   * 下一页文字
   */
  next: string;

  /**
   * Navigation hint label text
   *
   * 跳转提示文字
   */
  navigate: string;

  /**
   * Navigation button label text
   *
   * 跳转按钮文字
   */
  button: string;

  /**
   * Error text when invalid page number, `$page` will be replaced by total page number automatically
   *
   * 页码错误文字，其中 `$page` 会自动替换为当前的总页数
   */
  errorText: string;
}

export type PaginationLocaleConfig = ConvertLocaleConfig<PaginationLocaleData>;

export interface TOCLocaleData {
  /**
   * TOC header
   *
   * TOC 标题
   */
  header: string;
}

export type TOCLocaleConfig = ConvertLocaleConfig<TOCLocaleData>;

export interface HopeThemeMetaLocateData {
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

  /**
   * Table of contents
   *
   * 此页内容
   */
  toc: string;

  /**
   * Previous link
   *
   * 上一页
   */
  prev: string;

  /**
   * Next link
   *
   * 下一页
   */
  next: string;

  /**
   * Last updated Text
   *
   * 最后更新时间
   */
  lastUpdated: string;

  /**
   * Contributors text
   *
   * 贡献者
   */
  contributors: string;

  /**
   * Edit link text
   *
   * 编辑此页
   */
  editLink: string;
}

export interface HopeThemeMetaLocaleOptions {
  /**
   * Whether to show "Last Updated" or not
   *
   * 是否显示页面最后更新时间
   *
   * @default true
   */
  lastUpdated?: boolean;

  /**
   * Whether to show "Contributors" or not
   *
   * 是否显示页面贡献者
   *
   * @default true
   */
  contributors?: boolean;

  /**
   * Whether to show "Edit this page" or not
   *
   * 是否展示编辑此页链接
   *
   * @default true
   */
  editLink?: boolean;
}

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
   * Page nav - previous link
   */
  prev: string;

  /**
   * Page nav - next link
   */
  next: string;

  /**
   * Page meta - last updated config
   *
   * The text to replace the default "Last Updated"
   */
  lastUpdated: string;

  /**
   * Page meta - contributors config
   *
   * The text to replace the default "Contributors"
   */
  contributors: string;

  /**
   * Page meta - contributors config
   *
   * The text to replace the default "Edit this page"
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

  /**
   * Pattern of edit link, we provide built-in support for GitHub, Gitlab, Gitee, Bitbucket
   *
   * 编辑链接的匹配，我们已经为 GitHub、Gitlab、Gitee 和 Bitbucket 提供了内置支持
   *
   * @example ':repo/edit/:branch/:path'
   */
  editLinkPattern?: string;

  /**
   * The repo of your docs
   *
   * 文档仓库
   *
   * @default themeConfig.repo
   */
  docsRepo?: string;

  /**
   * The branch of your docs
   *
   * 文档所在分支
   *
   * @default 'main'
   */
  docsBranch?: string;

  /**
   * Docs dir location in repo
   *
   * 文档在仓库中的目录
   *
   * @default ''
   */
  docsDir?: string;
}

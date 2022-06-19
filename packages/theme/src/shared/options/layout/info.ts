export interface HopeThemeDocsLocaleOptions {
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

/**
 * 页脚选项
 *
 * Footer options
 */
export interface FooterLocaleOptions {
  /**
   * The default content for the footer, supports HTMLString.
   *
   * 页脚的默认内容，支持 HTMLString
   */
  footer?: string;

  /**
   * The default copyright info, set it to `false` to disable it by default.
   *
   * 默认的版权信息，设置为 `false` 来默认禁用它
   */
  copyright?: string | false;

  /**
   * Whether to display footer by default
   *
   * 是否默认显示页脚
   *
   * @default false
   */
  displayFooter?: boolean;
}

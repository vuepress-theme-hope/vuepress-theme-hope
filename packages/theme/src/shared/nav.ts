/**
 * Base nav item, displayed as text
 */
export interface NavItemOptions {
  /**
   * Text of item
   *
   * 项目文字
   */
  text: string;

  /**
   * Icon of item
   *
   * 项目图标
   */
  icon?: string;

  /**
   * Aria label of item
   *
   * 项目无障碍标签
   */
  ariaLabel?: string;
}

/**
 * Options for `<AutoLink>`
 */
export interface AutoLinkOptions extends NavItemOptions {
  /**
   * Link of item
   *
   * 当前页面链接
   */
  link: string;

  /**
   * Rel of `<a>` tag
   *
   * `<a>` 标签的 `rel` 属性
   */
  rel?: string;

  /**
   * Target of `<a>` tag
   *
   * `<a>` 标签的 `target` 属性
   */
  target?: string;

  /**
   * RegExp mode to be active
   *
   * 匹配激活的正则表达式
   */
  activeMatch?: string;

  /**
   * Whether it's active only when exact match
   *
   * 是否仅在完全匹配时激活
   */
  exact?: boolean;
}

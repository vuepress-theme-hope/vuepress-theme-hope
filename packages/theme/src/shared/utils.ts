/**
 * Base link item, displayed as text
 */
export interface TextItemOptions {
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
 * Props for `<AutoLink>`
 */
export interface AutoLinkOptions extends TextItemOptions {
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
   * Regexp mode to be active
   *
   * 匹配激活的正则表达式
   */
  activeMatch?: string;
}

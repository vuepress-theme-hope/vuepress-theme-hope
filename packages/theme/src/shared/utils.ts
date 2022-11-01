/**
 * Base link item, displayed as text
 */
export interface TextItem {
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
export interface AutoLink extends TextItem {
  /**
   * link of item
   *
   * 当前页面链接
   */
  link: string;

  /**
   * Rel of item anchor
   */
  rel?: string;

  /**
   * Target of item anchor
   */
  target?: string;

  /**
   * Regexp mode to be active
   *
   * 匹配激活的正则表达式
   */
  activeMatch?: string;
}

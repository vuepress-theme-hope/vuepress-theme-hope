export interface CopyCodeI18nConfig {
  /** 复制文字 */
  copy: string;
  /** 提示文字 */
  hint: string;
}

export interface CopyCodeOptions {
  /**
   * 代码块选择器
   *
   * Code block selector
   *
   * @default '.theme-default-content div[class*="language-"] pre'
   */
  selector?: string | string[];
  /**
   * 提示消息显示时间
   *
   * Prompt message display time
   *
   * @default 300
   */
  duration?: number;
  /**
   * 是否展示在移动端
   *
   * Whether to display on the mobile side
   *
   * @default false
   */
  showInMobile?: boolean;
}

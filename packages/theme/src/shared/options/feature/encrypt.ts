export interface HopeThemeEncryptLocaleData {
  /**
   * Aria label for encrypt icon
   *
   * 加密图标的无障碍标签
   */
  iconLabel: string;

  /**
   * Password placeholder
   *
   * 密码输入框的默认占位符
   */
  placeholder: string;

  /**
   * Whether remember password
   *
   * 是否记忆密码
   */
  remember: string;

  /**
   * Password error hint
   *
   * 密码错误提示
   */
  errorHint: string;
}

/**
 * Encrypt Options
 *
 * 加密选项
 */
export interface HopeThemeEncryptOptions {
  /**
   * Whether encrypt globally
   *
   * 是否全局加密
   *
   * @default false
   */
  global?: boolean;

  /**
   * Admin passwords, which has the highest authority
   *
   * 最高权限密码
   */
  admin?: string | string[];
  /**
   * Encrypt Configuration
   *
   * E.g.:
   *
   * ```json
   * {
   *   // This will encrypt the entire guide directory and both passwords will be available
   *   "/guide/": ["1234", "5678"],
   *   // this will only encrypt config/page.html
   *   "/config/page.html": "1234"
   * }
   * ```
   *
   * 加密配置
   *
   * ```json
   * {
   *   // 这会加密整个 guide 目录，并且两个密码都是可用的
   *   "/guide/": ["1234", "5678"],
   *   // 这只会加密 config/page.html
   *   "/config/page.html": "1234"
   * }
   * ```
   */
  config?: Record<string, string | string[]>;
}

/**
 * Encrypt Options
 *
 * 加密选项
 */
export interface HopeThemeEncryptConfig {
  /**
   * Whether encrypt globally
   *
   * 是否全局加密
   *
   * @default false
   */
  global?: boolean;

  /**
   * Admin passwords, which has the highest authority
   *
   * 最高权限密码
   */
  admin?: string[];
  /**
   * Encrypt Configuration
   *
   * 加密配置
   */
  config?: Record<string, string[]>;
}

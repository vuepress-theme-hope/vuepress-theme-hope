/**
 * Encrypt Options
 *
 * 加密选项
 */
export interface HopeThemeEncryptOptions {
  /**
   * Feature Status
   *
   * - `'global'` means enabled globally
   * - `'local'` means disabled globally and can be enabled in pages
   *
   * 功能状态
   *
   * - `'global'` 意味着全局启用
   * - `'local'` 意味着全局禁用，可在页面内启用
   *
   * @default 'local'
   */
  status?: "global" | "local";

  /**
   * Global passwords, which has the highest authority
   *
   * 最高权限密码
   */
  global?: string | string[];
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

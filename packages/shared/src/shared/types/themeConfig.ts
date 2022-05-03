export interface BaseThemeConfig {
  /**
   * Theme locales config
   *
   * 主题多语言配置
   */
  locales?: Record<string, Record<string, unknown> & { lang?: string }>;
}

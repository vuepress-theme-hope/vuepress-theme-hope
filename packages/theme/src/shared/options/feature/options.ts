import type {
  HopeThemeBlogLocaleData,
  HopeThemeBlogLocaleOptions,
} from "./blog";

export interface HopeThemeFeatureLocaleData {
  blogLocales: HopeThemeBlogLocaleData;
}

export interface HopeThemeFeatureLocaleOptions {
  /**
   * Blog feature
   */
  blog?: HopeThemeBlogLocaleOptions | false;
}

export interface HopeThemeFeatureOptions {
  /**
   * Dark mode support options:
   *
   * - `'auto-switch'`: "off | automatic | on" three-stage switch (Default)
   * - `'switch'`: "Close | Open" toggle switch
   * - `'auto'`: Automatically decide whether to apply dark mode based on user device’s color-scheme or current time
   * - `'disable'`: disable dark mode
   *
   * 深色模式支持选项:
   *
   * - `'auto-switch'`: "关闭 | 自动 | 打开" 的三段式开关 (默认)
   * - `'switch'`: "关闭 | 打开" 的切换式开关
   * - `'auto'`: 自动根据用户设备主题或当前时间决定是否应用深色模式
   * - `'disable'`: 禁用深色模式
   *
   * @default 'auto-switch'
   */
  darkmode?: "auto-switch" | "auto" | "switch" | "disable";

  /**
   * 主题色选项配置。
   *
   * Theme color configuration.
   *
   * E.g.:
   * ```js
   * {
   *   blue: '#2196f3',
   *   red: '#f26d6d',
   *   green: '#3eaf7c',
   *   orange: '#fb9b5f'
   * }
   * ```
   *
   * @default { blue: '#2196f3', red: '#f26d6d', green: '#3eaf7c', orange: '#fb9b5f' }
   */
  themeColor?: Record<string, string> | false;
}

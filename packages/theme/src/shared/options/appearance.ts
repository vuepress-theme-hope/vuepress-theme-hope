export type DarkmodeConfig =
  | "switch"
  | "auto"
  | "toggle"
  | "enable"
  | "disable";

export interface HopeThemeOutlookLocaleData {
  /**
   * Theme Color
   */
  themeColor: string;

  /**
   * Theme mode
   */
  darkmode: string;

  /**
   * Theme mode
   */
  fullscreen: string;
}

export interface HopeThemeAppearanceLocaleData {
  outlookLocales: {
    /**
     * Theme Color
     *
     * 主题色
     */
    themeColor: string;

    /**
     * Theme mode
     *
     * 夜间模式
     */
    darkmode: string;

    /**
     * Fullscreen text
     *
     * 全屏文字
     */
    fullscreen: string;
  };
}

export interface HopeThemeAppearanceOptions {
  /**
   * Whether enable pure mode
   *
   * 是否开启纯净模式
   *
   * @default false
   */
  pure?: boolean;

  /**
   * Dark mode support options:
   *
   * - `"switch"`: switch between dark, light and auto (default)
   * - `"toggle"`: toggle between lightmode and darkmode
   * - `"auto"`: Automatically decide whether to apply dark mode based on user device’s color-scheme or current time
   * - `"enable"`: only dark mode
   * - `"disable"`: disable dark mode
   *
   * 深色模式支持选项:
   *
   * - `"switch"`: 在深色模式，浅色模式和自动之间切换 (默认)
   * - `"toggle"`: 在深色模式和浅色模式之间切换
   * - `"auto"`: 自动根据用户设备主题或当前时间决定是否应用深色模式
   * - `"enable"`: 强制深色模式
   * - `"disable"`: 禁用深色模式
   *
   * @default 'auto-switch'
   */
  darkmode?: DarkmodeConfig;

  /**
   * Theme color configuration
   *
   * 主题色选项配置
   *
   * @default { blue: '#2196f3', red: '#f26d6d', green: '#3eaf7c', orange: '#fb9b5f' }
   */
  themeColor?: Record<string, string> | false;

  /**
   * Full screen button
   *
   * 全屏按钮
   *
   * @default true
   */
  fullscreen?: boolean;
}

export type HopeThemeAppearanceConfig = Required<HopeThemeAppearanceOptions>;

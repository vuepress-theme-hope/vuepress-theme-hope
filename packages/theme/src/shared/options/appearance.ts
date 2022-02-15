export type DarkmodeConfig =
  | "auto-switch"
  | "auto"
  | "switch"
  | "force-dark"
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
   * Font class 图标前缀
   *
   * Font class Icon prefix
   *
   * @default ''
   */
  iconPrefix?: string;

  /**
   * Dark mode support options:
   *
   * - `'auto-switch'`: "off | automatic | on" three-stage switch (Default)
   * - `'switch'`: "Close | Open" toggle switch
   * - `'auto'`: Automatically decide whether to apply dark mode based on user device’s color-scheme or current time
   * - `'force-dark'`: only dark mode
   * - `'disable'`: disable dark mode
   *
   * 深色模式支持选项:
   *
   * - `'auto-switch'`: "关闭 | 自动 | 打开" 的三段式开关 (默认)
   * - `'switch'`: "关闭 | 打开" 的切换式开关
   * - `'auto'`: 自动根据用户设备主题或当前时间决定是否应用深色模式
   * - `'force-dark'`: 强制深色模式
   * - `'disable'`: 禁用深色模式
   *
   * @default 'auto-switch'
   */
  darkmode?: DarkmodeConfig;

  /**
   * Theme color configuration.
   *
   * 主题色选项配置。
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
  fullScreen?: boolean;
}

export type HopeThemeAppearanceConfig = Required<HopeThemeAppearanceOptions>;

export type HopeThemeDarkmodeStatus =
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

export interface HopeThemeAppearanceRootOptions {
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
  darkmode?: HopeThemeDarkmodeStatus;

  /**
   * Theme color configuration
   *
   * 主题色选项配置
   *
   * @default false
   */
  themeColor?: Record<string, string> | false;

  /**
   * Full screen button
   *
   * 全屏按钮
   *
   * @default false
   */
  fullscreen?: boolean;

  /**
   * Link of font icon asset
   *
   * 字体图标资源链接
   *
   * @description `'iconfont'` and `'font-awesome'` keywords are supported
   */
  iconAssets?: string;

  /**
   * Font Icon class prefix
   *
   * 字体图标 class 前缀
   *
   * @default ''
   */
  iconPrefix?: string;
}

export type HopeThemeAppearanceRootConfig = HopeThemeAppearanceRootOptions &
  Required<
    Pick<
      HopeThemeAppearanceRootOptions,
      "darkmode" | "fullscreen" | "pure" | "themeColor"
    >
  >;

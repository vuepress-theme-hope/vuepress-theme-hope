export type DarkmodeOptions =
  | "switch"
  | "auto"
  | "toggle"
  | "enable"
  | "disable";

export interface OutlookLocaleData {
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

export interface AppearanceLocaleData {
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

export interface DeprecatedAppearanceOptions {
  /**
   * @deprecated Use `plugins.icon.assets` instead
   */
  iconAssets?: never;

  /**
   * @deprecated Use `plugins.icon.prefix` instead
   */
  iconPrefix?: never;
}

/**
 * @kind root
 */
export interface AppearanceOptions extends DeprecatedAppearanceOptions {
  /**
   * Whether enable pure mode
   *
   * 是否开启纯净模式
   *
   * @default false
   */
  pure?: boolean;

  /**
   * Whether enable focus mode
   *
   * @description Focus mode will be enabled by default when the `pure` mode is enabled
   * Fill in a number to indicate the delay time
   *
   * 是否开启沉浸模式
   *
   * @description 当 `pure` 模式启用时，沉浸模式将被默认启用，填入数字表示延迟时间
   *
   * @default false
   */
  focus?: number | boolean;

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
   * @default "auto-switch"
   */
  darkmode?: DarkmodeOptions;

  /**
   * Whether show external link icon
   *
   * 是否显示外部链接图标
   *
   * @default true
   */
  externalLinkIcon?: boolean;

  /**
   * Whether enable theme color picker
   *
   * 是否启用主题色选择器
   *
   * @default false
   */
  themeColor?: boolean;

  /**
   * Whether display print button in desktop mode
   *
   * 是否在桌面模式下显示打印按钮
   *
   * @default true
   */
  print?: boolean;

  /**
   * Full screen button
   *
   * 全屏按钮
   *
   * @default false
   */
  fullscreen?: boolean;
}

export type AppearanceConfig = AppearanceOptions;

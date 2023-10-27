export type RevealJsPlugin = "highlight" | "math" | "search" | "notes" | "zoom";

export type RevealJsTheme =
  | "auto"
  | "beige"
  | "black"
  | "blood"
  | "league"
  | "moon"
  | "night"
  | "serif"
  | "simple"
  | "sky"
  | "solarized"
  | "white";

/**
 * reveal.js options
 */
export interface RevealJsOptions {
  /**
   * reveal.js plugins
   *
   * 幻灯片插件
   *
   * @default []
   */
  plugins?: RevealJsPlugin[];

  /**
   * reveal.js themes
   *
   * 幻灯片主题
   *
   * @default ["auto"]
   */
  themes?: RevealJsTheme[];
}

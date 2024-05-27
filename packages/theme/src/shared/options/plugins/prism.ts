import type { PrismjsPluginOptions } from "@vuepress/plugin-prismjs";

export type PrismjsLightTheme =
  | "ateliersulphurpool-light"
  | "coldark-cold"
  | "coy"
  | "duotone-light"
  | "ghcolors"
  | "gruvbox-light"
  | "material-light"
  | "one-light"
  | "vs";

export type PrismjsDarkTheme =
  | "atom-dark"
  | "cb"
  | "coldark-dark"
  | "dark"
  | "dracula"
  | "duotone-dark"
  | "duotone-earth"
  | "duotone-forest"
  | "duotone-sea"
  | "duotone-space"
  | "gruvbox-dark"
  | "holi"
  | "hopscotch"
  | "lucario"
  | "material-dark"
  | "material-oceanic"
  | "night-owl"
  | "nord"
  | "one-dark"
  | "pojoaque"
  | "shades-of-purple"
  | "solarized-dark-atom"
  | "tomorrow"
  | "vsc-dark-plus"
  | "xonokai"
  | "z-touch";

export type PrismjsTheme = PrismjsDarkTheme | PrismjsLightTheme;

export interface PrismjsOptions extends PrismjsPluginOptions {
  /**
   * Single theme
   *
   * 单个主题
   *
   * @default 'nord'
   */
  theme?: PrismjsTheme;

  /**
   * Dual themes
   *
   * 双主题
   *
   * @default {
   *   light: 'one-light'
   *   dark: 'one-dark',
   * }
   */
  themes?: {
    light: PrismjsTheme;
    dark: PrismjsTheme;
  };
}

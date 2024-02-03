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

export interface PrismjsOptions {
  /**
   * Light theme
   *
   * @default 'one-light'
   */
  light?: PrismjsTheme;

  /**
   * Dark theme
   * @default 'one-dark'
   */
  dark?: PrismjsTheme;
}

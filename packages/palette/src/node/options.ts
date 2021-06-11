export interface PaletteOptions {
  /** identifier for palette */
  id: string;
  /**
   * user config file path, relative to source dir
   *
   * @default ".vuepress/styles/config.scss"
   */
  config?: string;
  /**
   * default config file path, should be absolute path
   *
   * This is the file you should use to provide default values with `!default`
   *
   * @default "vuepress-plugin-sass-palette/styles/default/config.scss"
   */
  defaultConfig?: string;
  /**
   * user palette file path, relative to source dir
   *
   * @default ".vuepress/styles/palette.scss"
   */
  palette?: string;
  /**
   * default palette file path, should be absolute path
   *
   * This is the file you should use to provide default values with `!default`
   *
   * @default "vuepress-plugin-sass-palette/styles/default/palette.scss"
   */

  defaultPalette?: string;
  /**
   * user style file path, relative to source dir
   *
   * @default ".vuepress/styles/palette.scss"
   */
  style?: string;
}

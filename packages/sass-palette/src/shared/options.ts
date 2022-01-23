export interface SassPaletteOptions {
  /**
   * 调色板的唯一 ID，用于避免重复注册
   *
   * identifier for palette, used to avoid duplicate registion
   */
  id: string;

  /**
   * 用户配置文件路径，相对于源文件夹
   *
   * user config file path, relative to source dir
   *
   * @default ".vuepress/styles/config.scss"
   */
  config?: string;

  /**
   * 默认的配置文件路径，应为绝对路径
   *
   * 这是你应该通过 `!default` 来提供默认变量的文件
   *
   * default config file path, should be absolute path
   *
   * This is the file you should use to provide default values with `!default`
   *
   * @default "vuepress-plugin-sass-palette/styles/default/config.scss"
   */
  defaultConfig?: string;

  /**
   * 用户的调色板文件路径，相对于源文件夹
   *
   * user palette file path, relative to source dir
   *
   * @default ".vuepress/styles/palette.scss"
   */
  palette?: string;

  /**
   * 默认的调色板文件路径，应为绝对路径
   *
   * 这是你应该通过 `!default` 来提供默认调色板值的文件
   *
   * default palette file path, should be absolute path
   *
   * This is the file you should use to provide default values with `!default`
   *
   * @default "vuepress-plugin-sass-palette/styles/default/palette.scss"
   */

  defaultPalette?: string;

  /**
   * 用户的样式文件路径，相对于源文件夹
   *
   * user style file path, relative to source dir
   *
   * @default ".vuepress/styles/palette.scss"
   */
  style?: string;
}

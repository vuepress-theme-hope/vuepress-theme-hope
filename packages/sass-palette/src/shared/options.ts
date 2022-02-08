export interface SassPaletteOptions {
  /**
   * identifier for palette, used to avoid duplicate registion
   *
   * 调色板的唯一 ID，用于避免重复注册
   */
  id: string;

  /**
   * user config file path, relative to source dir
   *
   * 用户配置文件路径，相对于源文件夹
   *
   * @default ".vuepress/styles/config.scss"
   */
  config?: string;

  /**
   * default config file path, should be absolute path
   *
   * This is the file you should use to provide default values with `!default`
   *
   * 默认的配置文件路径，应为绝对路径
   *
   * 这是你应该通过 `!default` 来提供默认变量的文件
   *
   * @default "vuepress-plugin-sass-palette/styles/default/config.scss"
   */
  defaultConfig?: string;

  /**
   * user palette file path, relative to source dir
   *
   * 用户的调色板文件路径，相对于源文件夹
   *
   * @default ".vuepress/styles/palette.scss"
   */
  palette?: string;

  /**
   * default palette file path, should be absolute path
   *
   * This is the file you should use to provide default values with `!default`
   *
   * 默认的调色板文件路径，应为绝对路径
   *
   * 这是你应该通过 `!default` 来提供默认调色板值的文件
   *
   * @default "vuepress-plugin-sass-palette/styles/default/palette.scss"
   */

  defaultPalette?: string;

  /**
   * custom generator, used to generate derivative values with palette config
   *
   * e.g: you may want to provide a `$themeColorLight` based on `$themeColor`
   *
   * 自定义的生成器，用于生成调色板配置的衍生值
   *
   * e.g: 你可能想要根据 `$themeColor` 的值提供一个 `themeColorLight`
   */
  generator?: string;

  /**
   * user style file path, relative to source dir
   *
   * 用户的样式文件路径，相对于源文件夹
   *
   * @default ".vuepress/styles/palette.scss"
   */
  style?: string;
}

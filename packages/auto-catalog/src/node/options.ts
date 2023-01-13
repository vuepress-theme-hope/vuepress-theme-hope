import type { LocaleConfig, PageFrontmatter } from "@vuepress/core";
import type { CatalogLocaleData } from "vuepress-plugin-components";

export interface AutoCatalogOptions {
  /**
   * Exclude paths from being generated
   *
   * 排除需要生成的路径
   *
   * @default []
   */
  exclude?: (RegExp | string)[];

  /**
   * Frontmatter of the generated page
   *
   * @param path path to be generated
   * @returns title of the generated page
   *
   * 页面 Frontmatter 获取器
   *
   * @param path 当前生成的路径名称
   * @returns 页面 Frontmatter
   */
  frontmatter?: (path: string) => PageFrontmatter;

  /**
   * The max level of the generated catalog
   *
   * @description Available with built-in component, only support 1,2,3
   *
   * 生成的目录最大层级
   *
   * @description 仅支持内置组件，仅支持 1,2,3
   *
   * @default 3
   */
  level?: number;

  /**
   * Component name to use as catalog
   *
   * @description By default the plugin will register an `<AutoCatalog />` component and use interface. If you want to use your own component, you can set this option to the name of your component.
   *
   * 用作目录的组件名称
   *
   * @description 默认情况下，插件将注册一个 `<AutoCatalog />` 组件并使用该组件。如果你想使用自己的组件，可以将此选项设置为你的组件的名称。
   *
   * @default 'AutoCatalog'
   */
  component?: string;

  /**
   * Catalog locales
   *
   * 目录组件国际化配置
   */
  locales?: LocaleConfig<CatalogLocaleData>;
}

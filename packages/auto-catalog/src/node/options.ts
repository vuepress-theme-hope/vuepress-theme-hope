import {
  type LocaleConfig,
  type Page,
  type PageFrontmatter,
} from "@vuepress/core";

import { type AutoCatalogLocaleData } from "../shared/index.js";

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
   * Page title getter
   *
   * 页面标题获取器
   */
  getTitle?: <
    ExtraPageData extends Record<string | number | symbol, unknown> = Record<
      never,
      never
    >,
    ExtraPageFrontmatter extends Record<
      string | number | symbol,
      unknown
    > = Record<string, unknown>,
    ExtraPageFields extends Record<string | number | symbol, unknown> = Record<
      never,
      never
    >
  >(
    page: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>
  ) => string;

  /**
   * @default 'title'
   */
  titleRouteMetaKey?: string;

  /**
   * Page icon getter
   *
   * 页面图标获取器
   */
  getIcon?: <
    ExtraPageData extends Record<string | number | symbol, unknown> = Record<
      never,
      never
    >,
    ExtraPageFrontmatter extends Record<
      string | number | symbol,
      unknown
    > = Record<string, unknown>,
    ExtraPageFields extends Record<string | number | symbol, unknown> = Record<
      never,
      never
    >
  >(
    page: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>
  ) => string | null | undefined;

  /**
   * @default 'i'
   */
  iconRouteMetaKey?: string;

  /**
   * Page order getter
   *
   * 页面顺序获取器
   */
  getOrder?: <
    ExtraPageData extends Record<string | number | symbol, unknown> = Record<
      never,
      never
    >,
    ExtraPageFrontmatter extends Record<
      string | number | symbol,
      unknown
    > = Record<string, unknown>,
    ExtraPageFields extends Record<string | number | symbol, unknown> = Record<
      never,
      never
    >
  >(
    page: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>
  ) => number | null | undefined;

  /**
   * @default 'O'
   */
  orderRouteMetaKey?: string;

  /**
   * Page index getter
   *
   * @description Returning a boolean value to indicate whether the page should be included in the catalog
   *
   * 页面索引获取器
   *
   * @description 返回一个布尔值，用于指示页面是否应该包含在目录中
   */
  getIndex?: <
    ExtraPageData extends Record<string | number | symbol, unknown> = Record<
      never,
      never
    >,
    ExtraPageFrontmatter extends Record<
      string | number | symbol,
      unknown
    > = Record<string, unknown>,
    ExtraPageFields extends Record<string | number | symbol, unknown> = Record<
      never,
      never
    >
  >(
    page: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>
  ) => boolean;

  /**
   * @default 'I'
   */
  indexRouteMetaKey?: string;

  /**
   * Component name to use as catalog
   *
   * @description By default the plugin will register an `<AutoCatalog />` component and use interface. If you want to use your own component, you can set this option to the name of your component.
   *
   * 用作目录的组件名称
   *
   * @description 默认情况下，插件将注册一个 `<AutoCatalog />` 组件并使用该组件。如果你想使用自己的组件，可以将此选项设置为你的组件的名称。
   */
  component?: string;

  /**
   * Catalog locales
   *
   * 目录组件国际化配置
   */
  locales?: LocaleConfig<AutoCatalogLocaleData>;
}

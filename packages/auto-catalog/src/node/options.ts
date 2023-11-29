import type { LocaleConfig, PageFrontmatter } from "@vuepress/core";

import type { AutoCatalogLocaleData } from "../shared/index.js";

export interface DeprecatedAutoCatalogOptions {
  /**
   * @deprecated use `defineAutoCatalogIconComponent` instead
   * @see https://plugin-auto-catalog.vuejs.press/config/#defineautocatalogiconcomponent
   */
  iconComponent?: never;

  /**
   * @deprecated use `defineAutoCatalogGetter` instead
   */
  getTitle?: never;

  /**
   * @deprecated use `defineAutoCatalogGetter` instead
   */
  getIcon?: never;

  /**
   * @deprecated use `defineAutoCatalogGetter` instead
   */
  getOrder?: never;

  /**
   * @deprecated use `defineAutoCatalogGetter` instead
   */
  getIndex?: never;

  /**
   * @deprecated use `defineAutoCatalogGetter` instead
   */
  titleGetter?: never;

  /**
   * @deprecated use `defineAutoCatalogGetter` instead
   */
  titleRouteMetaKey?: never;

  /**
   * @deprecated use `defineAutoCatalogGetter` instead
   */
  iconGetter?: never;

  /**
   * @deprecated use `defineAutoCatalogGetter` instead
   */
  iconRouteMetaKey?: never;

  /**
   * @deprecated use `defineAutoCatalogGetter` instead
   */
  orderGetter?: never;

  /**
   * @deprecated use `defineAutoCatalogGetter` instead
   */
  orderRouteMetaKey?: never;

  /**
   * @deprecated use `defineAutoCatalogGetter` instead
   */
  shouldIndex?: never;

  /**
   * @deprecated use `defineAutoCatalogGetter` instead
   */
  indexRouteMetaKey?: never;
}

export interface AutoCatalogOptions extends DeprecatedAutoCatalogOptions {
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
   * Whether show index for catalog
   *
   * 目录是否显示索引
   *
   * @default false
   */
  index?: boolean;

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
   * Exclude paths from being generated
   *
   * 排除需要生成的路径
   *
   * @default []
   */
  exclude?: (RegExp | string)[];

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

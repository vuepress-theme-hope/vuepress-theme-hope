import type { Page } from "@vuepress/core";

export interface BlogCategoryOptions {
  /**
   * Unique category name
   *
   * 唯一的分类名称
   */
  key: string;

  /**
   * Function getting category from page
   *
   * 从页面中获取分类的函数
   */
  getter: (page: Page) => string[];

  /**
   * A custom function to sort the pages
   *
   * 页面排序器
   */
  sorter?: (pageA: Page, pageB: Page) => number;

  /**
   * Path pattern
   *
   * @description `:key` will be replaced by the "slugify" result of the orginal key
   *
   * 路径图案
   *
   * @description `:key` 将会被替换为原 key 的 slugify 结果
   *
   * @default `/:key/`
   */
  path?: string;

  /**
   * Layout name
   *
   * 布局组件名称
   *
   * @default 'Layout'
   */
  layout?: string;

  /**
   * Frontmatter
   *
   * Front Matter 配置
   */
  frontmatter?: (localePath: string) => Record<string, string>;

  /**
   * Item Path pattern or custom function
   *
   * @description When filling in a string, `:key` and `:name` will be replaced by the "slugify" result of the orginal key and name
   *
   * 项目路径图案或自定义函数
   *
   * @description 当填入字符串的时候, `:key` 和 `:name` 会被自动替换为原始的 key、name 的 slugify 结果。
   *
   * @default `/:key/:name/`
   */
  itemPath?: string | ((name: string) => string);

  /**
   * Item layout name
   *
   * 项目布局组件名称
   *
   * @default 'Layout'
   */
  itemLayout?: string;

  /**
   * Items Frontmatter
   *
   * 项目 Front Matter 配置
   */
  itemFrontmatter?: (
    name: string,
    localePath: string
  ) => Record<string, string>;
}

export interface BlogTypeOptions {
  /**
   * Unique type name
   *
   * 唯一的类型名称
   */
  key: string;

  /**
   * A filter function to determine whether a page should be the type
   *
   * 一个过滤函数来决定页面是否满足此类型
   */
  filter: (page: Page) => boolean;

  /**
   * A custom function to sort the pages
   *
   * 页面排序器
   */
  sorter?: (pageA: Page, pageB: Page) => number;

  /**
   * Path to register
   *
   * 需要注册的页面路径
   *
   * @default '/:key/'
   */
  path?: string;

  /**
   * Layout name
   *
   * 布局组件名称
   *
   * @default 'Layout'
   */
  layout?: string;

  /**
   * Frontmatter
   *
   * Front Matter 配置
   */
  frontmatter?: (localePath: string) => Record<string, string>;
}

export interface BlogOptions {
  /**
   * Function getting article info.
   *
   * 获取文章信息的函数。
   */
  getInfo?: (page: Page) => Record<string, unknown>;

  /**
   * Page filter, determine whether a page should be included.
   *
   * 页面过滤器，此函数用于鉴别页面是否作为文章。
   *
   * @default (page) => Boolean(page.filePathRelative) && !page.frontmatter.home
   */
  filter?: (page: Page) => boolean;

  /**
   * Categories config
   */
  category?: BlogCategoryOptions[];

  /**
   * Types config
   */
  type?: BlogTypeOptions[];

  /**
   * Key used when injecting info to route meta.
   *
   * 注入文章信息至路由元数据时使用的键名。
   *
   * @default '_blog'
   */
  metaScope?: string;

  /**
   * Slugify function
   *
   * Slugify 函数
   *
   * @default (name) => name.replace(/ _/g, '-').toLowerCase()
   */
  slugify?: (name: string) => string;

  /**
   * Whether enable hotReload
   *
   * @description This may have performance impact in large sites
   *
   * 是否启用热更新
   *
   * @description 在大型站点上，这可能会有性能影响
   *
   * @default false
   */
  hotReload?: boolean;
}

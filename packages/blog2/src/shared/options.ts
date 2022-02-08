import type { Page } from "@vuepress/core";

export interface BlogTypeOptions {
  /**
   * Unique type name
   */
  key: string;

  /**
   * A filter function to determine whether a page should be the type
   */
  filter: (page: Page) => boolean;

  /**
   * A custom function to sort the pages
   */
  sorter?: (pageA: Page, pageB: Page) => number;

  /**
   * Path to register
   *
   * @default '/:key/'
   */
  path?: string;

  /**
   * Layout name
   *
   * @default 'Layout'
   */
  layout?: string;
}

export interface BlogCategoryOptoins {
  /**
   * Unique category name
   */
  key: string;

  /**
   * Function getting category
   */
  getter: (page: Page) => string[];

  /**
   * A custom function to sort the pages
   */
  sorter?: (pageA: Page, pageB: Page) => number;

  /**
   * Path pattern or custom function
   *
   * @description when filling in a string, `:key` will be replaced by the "slugify" result of the orginal key and name
   *
   * @default `/:key/:name/`
   */
  path?: string;

  /**
   * Layout name
   *
   * @default 'Layout'
   */
  layout?: string;

  /**
   * Path pattern or custom function
   *
   * @description when filling in a string, `:key` and `:name` will be replaced by the "slugify" result of the orginal key and name
   *
   * @default `/:key/:name/`
   */
  itemPath?: string | ((name: string) => string);

  /**
   * Layout name
   *
   * @default 'Layout'
   */
  itemLayout?: string;
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
   * Types
   */
  type?: BlogTypeOptions[];

  /**
   * Categories
   */
  category?: BlogCategoryOptoins[];

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
   * @default (name) => encodeURI(name.replace(/ _/g, '-')).toLowerCase()
   */
  slugify?: (name: string) => string;
}

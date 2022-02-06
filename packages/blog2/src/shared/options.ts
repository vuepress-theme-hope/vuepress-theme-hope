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
   * @default '_blog'
   */
  metaScope?: string;

  /**
   * Injecting meta
   *
   * 向路由中注入信息
   */
  injectMeta?: (page: Page) => Record<string, unknown>;

  /**
   * Page filter, determine whether a page should be included
   *
   * 页面过滤器，此函数用于鉴别页面是否作为文章
   *
   * @default () => true
   */
  filter?: (page: Page) => boolean;

  /**
   * Slugify function
   *
   * @default (name) => encodeURI(name.replace(/ _/g, '-')).toLowerCase()
   */
  slugify?: (name: string) => string;

  /**
   * Types
   */
  type?: BlogTypeOptions[];

  /**
   * Categories
   */
  category?: BlogCategoryOptoins[];
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Page } from "@vuepress/core";

export interface BlogCategoryOptions<
  ExtraPageData extends Record<any, any> = Record<never, never>,
  ExtraPageFrontmatter extends Record<any, any> = Record<string, unknown>,
  ExtraPageFields extends Record<any, any> = Record<never, never>,
> {
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
  getter: (
    page: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>,
  ) => string[];

  /**
   * A custom function to sort the pages
   *
   * 页面排序器
   */
  sorter?: (
    pageA: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>,
    pageB: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>,
  ) => number;

  /**
   * Path pattern of page to be registered
   *
   * @description `:key` will be replaced by the "slugify" result of the original key
   *
   * 待注册的页面路径图案
   *
   * @description `:key` 将会被替换为原 key 的 slugify 结果
   *
   * @default `/:key/`
   */
  path?: string | false;

  /**
   * Page layout name
   *
   * 页面布局组件名称
   *
   * @default "Layout"
   */
  layout?: string;

  /**
   * Frontmatter
   *
   * Front Matter 配置
   */
  frontmatter?: (localePath: string) => Record<string, unknown>;

  /**
   * Item page path pattern or custom function to be registered
   *
   * @description When filling in a string, `:key` and `:name` will be replaced by the "slugify" result of the original key and name
   *
   * 待注册的项目页面路径图案或自定义函数
   *
   * @description 当填入字符串的时候, `:key` 和 `:name` 会被自动替换为原始的 key、name 的 slugify 结果。
   *
   * @default `/:key/:name/`
   */
  itemPath?: string | ((name: string) => string) | false;

  /**
   * Item page layout name
   *
   * 项目页面布局组件名称
   *
   * @default "Layout"
   */
  itemLayout?: string;

  /**
   * Items Frontmatter
   *
   * 项目 Front Matter 配置
   */
  itemFrontmatter?: (
    name: string,
    localePath: string,
  ) => Record<string, unknown>;
}

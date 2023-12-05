/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Page } from "@vuepress/core";

export interface BlogTypeOptions<
  ExtraPageData extends Record<any, any> = Record<never, never>,
  ExtraPageFrontmatter extends Record<any, any> = Record<string, unknown>,
  ExtraPageFields extends Record<any, any> = Record<never, never>,
> {
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
  filter: (
    page: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>,
  ) => boolean;

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
   * Page path to be registered
   *
   * 待注册的页面路径
   *
   * @default "/:key/"
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
}

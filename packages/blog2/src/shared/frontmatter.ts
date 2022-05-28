import { BasePageFrontMatter } from "vuepress-shared";

export interface BlogCategoryFrontmatterOptions {
  type: "category";
  /**
   * Unique key under current category
   *
   * 在当前分类下全局唯一的 key
   */
  key: string;
  /**
   * Current category name
   *
   * @description Only available in category item page
   *
   * 当前的分类名称
   *
   * @description 仅在分类子项目页面中可用
   */
  name?: string;
}

export interface BlogTypeFrontmatterOptions {
  type: "type";
  /**
   * Unique key under current category
   *
   * 在当前分类下全局唯一的 key
   */
  key: string;
}

export interface BlogPluginCategoryFrontmatter extends BasePageFrontMatter {
  blog: BlogCategoryFrontmatterOptions;
}

export interface BlogPluginTypeFrontmatter extends BasePageFrontMatter {
  blog: BlogTypeFrontmatterOptions;
}

export type BlogPluginFrontmatter =
  | BlogPluginCategoryFrontmatter
  | BlogPluginTypeFrontmatter;

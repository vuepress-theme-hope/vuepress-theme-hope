import { BasePageFrontMatter } from "@mr-hope/vuepress-shared";

export interface BlogCategoryFrontmatterOptions {
  type: "category";
  key: string;
  name?: string;
}

export interface BlogTypeFrontmatterOptions {
  type: "type";
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

import { defaultPageSorter } from "./utils.js";
import { ArticleInfoType } from "../../../shared/index.js";

import type { BlogCategoryOptions } from "vuepress-plugin-blog2";
import type { GitData } from "@vuepress/plugin-git";
import type {
  ArticleInfo,
  BlogPluginOptions,
  ThemeData,
  ThemeNormalPageFrontmatter,
} from "../../../shared/index.js";

export const getCategoryCategory = (
  options: BlogPluginOptions,
  themeData: ThemeData
): BlogCategoryOptions<
  { git: GitData },
  ThemeNormalPageFrontmatter,
  { routeMeta: ArticleInfo }
> =>
  <
    BlogCategoryOptions<
      { git: GitData },
      ThemeNormalPageFrontmatter,
      { routeMeta: ArticleInfo }
    >
  >{
    key: "category",
    getter: ({ routeMeta }) => routeMeta[ArticleInfoType.category] || [],
    sorter: defaultPageSorter,
    path: options.category,
    layout: "BlogCategory",
    frontmatter: (localePath) => ({
      title: themeData.locales[localePath].blogLocales.category,
      feed: false,
      sitemap: false,
    }),
    itemPath: options.categoryItem,
    itemFrontmatter: (name, localePath) => ({
      title: `${name} ${themeData.locales[localePath].blogLocales.category}`,
      feed: false,
      sitemap: false,
    }),
    itemLayout: "BlogCategory",
  };

export const getTagCategory = (
  options: BlogPluginOptions,
  themeData: ThemeData
): BlogCategoryOptions<
  { git: GitData },
  ThemeNormalPageFrontmatter,
  { routeMeta: ArticleInfo }
> =>
  <
    BlogCategoryOptions<
      { git: GitData },
      ThemeNormalPageFrontmatter,
      { routeMeta: ArticleInfo }
    >
  >{
    key: "tag",
    getter: ({ routeMeta }) => routeMeta[ArticleInfoType.tag] || [],
    sorter: defaultPageSorter,
    path: options.tag,
    layout: "BlogCategory",
    frontmatter: (localePath) => ({
      title: themeData.locales[localePath].blogLocales.tag,
      feed: false,
      sitemap: false,
    }),
    itemPath: options.tagItem,
    itemLayout: "BlogCategory",
    itemFrontmatter: (name, localePath) => ({
      title: `${name} ${themeData.locales[localePath].blogLocales.tag}`,
      feed: false,
      sitemap: false,
    }),
  };

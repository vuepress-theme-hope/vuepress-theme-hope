import { type GitData } from "@vuepress/plugin-git";
import { type BlogCategoryOptions } from "vuepress-plugin-blog2";
import { isArray } from "vuepress-shared/node";

import { defaultPageSorter } from "./utils.js";
import {
  type ArticleInfo,
  ArticleInfoType,
  type BlogPluginOptions,
  type ThemeData,
  type ThemeNormalPageFrontmatter,
} from "../../../shared/index.js";

/** @private */
export const getBlogCategoryCategory = (
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
    getter: ({ routeMeta }) => {
      const category = routeMeta[ArticleInfoType.category];

      return isArray(category) ? category : category ? [category] : [];
    },
    sorter: defaultPageSorter,
    path: options.category,
    layout: "BlogCategory",
    frontmatter: (localePath) => ({
      title: themeData.locales[localePath].blogLocales.category,
      index: false,
      feed: false,
      sitemap: false,
    }),
    itemPath: options.categoryItem,
    itemFrontmatter: (name, localePath) => ({
      title: `${name} ${themeData.locales[localePath].blogLocales.category}`,
      index: false,
      feed: false,
      sitemap: false,
    }),
    itemLayout: "BlogCategory",
  };

/** @private */
export const getBlogTagCategory = (
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
    getter: ({ routeMeta }) => {
      const tag = routeMeta[ArticleInfoType.tag];

      return isArray(tag) ? tag : tag ? [tag] : [];
    },
    sorter: defaultPageSorter,
    path: options.tag,
    layout: "BlogCategory",
    frontmatter: (localePath) => ({
      title: themeData.locales[localePath].blogLocales.tag,
      index: false,
      feed: false,
      sitemap: false,
    }),
    itemPath: options.tagItem,
    itemLayout: "BlogCategory",
    itemFrontmatter: (name, localePath) => ({
      title: `${name} ${themeData.locales[localePath].blogLocales.tag}`,
      index: false,
      feed: false,
      sitemap: false,
    }),
  };

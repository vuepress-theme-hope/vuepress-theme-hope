import { isArray } from "@vuepress/helper";
import type { BlogCategoryOptions } from "@vuepress/plugin-blog";
import type { GitData } from "@vuepress/plugin-git";

import {
  BLOG_LAYOUT,
  DEFAULT_BLOG_FRONTMATTER,
  defaultPageSorter,
} from "./utils.js";
import type {
  ArticleInfoData,
  BlogOptions,
  ThemeData,
  ThemeNormalPageFrontmatter,
} from "../../../shared/index.js";

/** @private */
export const getBlogCategoryCategory = (
  options: BlogOptions,
  themeData: ThemeData,
): BlogCategoryOptions<
  { git: GitData },
  ThemeNormalPageFrontmatter,
  { routeMeta: ArticleInfoData }
> =>
  ({
    key: "category",
    getter: ({ routeMeta }) => {
      const category = routeMeta.category;

      return isArray(category) ? category : [];
    },
    sorter: defaultPageSorter,
    path: options.category,
    layout: BLOG_LAYOUT,
    frontmatter: (localePath) => ({
      ...DEFAULT_BLOG_FRONTMATTER,
      title: themeData.locales[localePath].blogLocales.category,
    }),
    itemPath: options.categoryItem,
    itemFrontmatter: (name, localePath) => ({
      ...DEFAULT_BLOG_FRONTMATTER,
      title: `${name} ${themeData.locales[localePath].blogLocales.category}`,
    }),
    itemLayout: BLOG_LAYOUT,
  }) as BlogCategoryOptions<
    { git: GitData },
    ThemeNormalPageFrontmatter,
    { routeMeta: ArticleInfoData }
  >;

/** @private */
export const getBlogTagCategory = (
  options: BlogOptions,
  themeData: ThemeData,
): BlogCategoryOptions<
  { git: GitData },
  ThemeNormalPageFrontmatter,
  { routeMeta: ArticleInfoData }
> =>
  ({
    key: "tag",
    getter: ({ routeMeta }) => {
      const tag = routeMeta.tag;

      return isArray(tag) ? tag : [];
    },
    sorter: defaultPageSorter,
    path: options.tag,
    layout: BLOG_LAYOUT,
    frontmatter: (localePath) => ({
      ...DEFAULT_BLOG_FRONTMATTER,
      title: themeData.locales[localePath].blogLocales.tag,
    }),
    itemPath: options.tagItem,
    itemLayout: BLOG_LAYOUT,
    itemFrontmatter: (name, localePath) => ({
      ...DEFAULT_BLOG_FRONTMATTER,
      title: `${themeData.locales[localePath].blogLocales.tag}: ${name}`,
    }),
  }) as BlogCategoryOptions<
    { git: GitData },
    ThemeNormalPageFrontmatter,
    { routeMeta: ArticleInfoData }
  >;

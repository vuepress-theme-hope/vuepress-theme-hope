import { dateSorter } from "@vuepress/helper";
import type { BlogTypeOptions } from "@vuepress/plugin-blog";
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
export const getBlogArticleType = (
  options: BlogOptions,
  themeData: ThemeData,
): BlogTypeOptions<
  { git: GitData },
  ThemeNormalPageFrontmatter,
  { routeMeta: ArticleInfoData }
> =>
  ({
    key: "article",

    filter: ({ frontmatter, filePathRelative }): boolean =>
      // Declaring this is an article
      frontmatter.article ??
      // Generated from markdown files and not homepage
      (Boolean(filePathRelative) && !frontmatter.home),

    sorter: defaultPageSorter,

    path: options.article,
    layout: BLOG_LAYOUT,

    frontmatter: (localePath) => ({
      ...DEFAULT_BLOG_FRONTMATTER,
      title: themeData.locales[localePath].blogLocales.article,
    }),
  }) as BlogTypeOptions<
    { git: GitData },
    ThemeNormalPageFrontmatter,
    { routeMeta: ArticleInfoData }
  >;

/** @private */
export const getBlogStarType = (
  options: BlogOptions,
  themeData: ThemeData,
): BlogTypeOptions<
  { git: GitData },
  ThemeNormalPageFrontmatter,
  { routeMeta: ArticleInfoData }
> =>
  ({
    key: "star",

    filter: ({ frontmatter }) => Boolean(frontmatter.star),

    sorter: (pageA, pageB) => {
      const prevKey = pageA.frontmatter.star;
      const nextKey = pageB.frontmatter.star;

      if (prevKey && nextKey && prevKey !== nextKey)
        return Number(nextKey) - Number(prevKey);
      if (prevKey && !nextKey) return -1;
      if (!prevKey && nextKey) return 1;

      return dateSorter(pageA.routeMeta.date, pageB.routeMeta.date);
    },

    path: options.star,
    layout: BLOG_LAYOUT,

    frontmatter: (localePath) => ({
      ...DEFAULT_BLOG_FRONTMATTER,
      title: themeData.locales[localePath].blogLocales.star,
    }),
  }) as BlogTypeOptions<
    { git: GitData },
    ThemeNormalPageFrontmatter,
    { routeMeta: ArticleInfoData }
  >;

/** @private */
export const getBlogTimelineType = (
  options: BlogOptions,
  themeData: ThemeData,
): BlogTypeOptions<
  { git: GitData },
  ThemeNormalPageFrontmatter,
  { routeMeta: ArticleInfoData }
> =>
  ({
    key: "timeline",

    filter: ({ frontmatter, routeMeta }) =>
      "date" in routeMeta && (frontmatter.timeline ?? true),

    sorter: (pageA, pageB) =>
      dateSorter(pageA.routeMeta.date, pageB.routeMeta.date),

    path: options.timeline,
    layout: BLOG_LAYOUT,

    frontmatter: (localePath) => ({
      ...DEFAULT_BLOG_FRONTMATTER,
      title: themeData.locales[localePath].blogLocales.timeline,
    }),
  }) as BlogTypeOptions<
    { git: GitData },
    ThemeNormalPageFrontmatter,
    { routeMeta: ArticleInfoData }
  >;

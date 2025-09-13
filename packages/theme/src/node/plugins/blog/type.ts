import { dateSorter, getDate } from "@vuepress/helper";
import type { BlogTypeOptions } from "@vuepress/plugin-blog";
import type { GitData } from "@vuepress/plugin-git";

import {
  BLOG_LAYOUT,
  DEFAULT_BLOG_FRONTMATTER,
  defaultPageSorter,
} from "./utils.js";
import type {
  ArticleInfoData,
  ThemeData,
  ThemeNormalPageFrontmatter,
} from "../../../shared/index.js";
import type { BlogOptions } from "../../typings/index.js";

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
> => {
  // Handle timeline configuration
  const timelineConfig =
    typeof options.timeline === "string"
      ? { path: options.timeline, useUpdateTime: false }
      : { path: "/timeline/", useUpdateTime: false, ...options.timeline };

  return {
    key: "timeline",

    filter: ({ frontmatter, routeMeta }) =>
      "date" in routeMeta && (frontmatter.timeline ?? true),

    sorter: (pageA, pageB) => {
      const getDateForSorting = (page: typeof pageA): number => {
        if (page.frontmatter.date) {
          const date = getDate(page.frontmatter.date);

          if (date) return date.getTime();
        }

        if (timelineConfig.useUpdateTime && page.data.git.updatedTime) {
          return page.data.git.updatedTime;
        }

        return page.routeMeta.date ?? 0;
      };

      const dateA = getDateForSorting(pageA);
      const dateB = getDateForSorting(pageB);

      return dateSorter(dateA, dateB);
    },

    path: timelineConfig.path,
    layout: BLOG_LAYOUT,

    frontmatter: (localePath) => ({
      ...DEFAULT_BLOG_FRONTMATTER,
      title: themeData.locales[localePath].blogLocales.timeline,
    }),
  } as BlogTypeOptions<
    { git: GitData },
    ThemeNormalPageFrontmatter,
    { routeMeta: ArticleInfoData }
  >;
};

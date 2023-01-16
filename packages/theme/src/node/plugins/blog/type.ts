import { defaultPageSorter } from "./utils.js";
import { compareDate } from "vuepress-shared/node";
import { ArticleInfoType } from "../../../shared/index.js";

import type { BlogTypeOptions } from "vuepress-plugin-blog2";
import type { GitData } from "@vuepress/plugin-git";
import type {
  ArticleInfo,
  BlogPluginOptions,
  ThemeData,
  ThemeNormalPageFrontmatter,
} from "../../../shared/index.js";

export const getArticleType = (
  options: BlogPluginOptions,
  themeData: ThemeData
): BlogTypeOptions<
  { git: GitData },
  ThemeNormalPageFrontmatter,
  { routeMeta: ArticleInfo }
> =>
  <
    BlogTypeOptions<
      { git: GitData },
      ThemeNormalPageFrontmatter,
      { routeMeta: ArticleInfo }
    >
  >{
    key: "article",
    sorter: defaultPageSorter,
    filter: ({ frontmatter, filePathRelative }): boolean =>
      // not home
      !frontmatter.home &&
      // declaring this is an article
      (frontmatter.article ||
        // generated from markdown files
        Boolean(frontmatter.article !== false && filePathRelative)),
    path: options.article,
    layout: "BlogType",
    frontmatter: (localePath) => ({
      title: themeData.locales[localePath].blogLocales.article,
      feed: false,
      sitemap: false,
    }),
  };

export const getStarType = (
  options: BlogPluginOptions,
  themeData: ThemeData
): BlogTypeOptions<
  { git: GitData },
  ThemeNormalPageFrontmatter,
  { routeMeta: ArticleInfo }
> =>
  <
    BlogTypeOptions<
      { git: GitData },
      ThemeNormalPageFrontmatter,
      { routeMeta: ArticleInfo }
    >
  >{
    key: "star",
    filter: ({ frontmatter }) => Boolean(frontmatter.star),
    sorter: (pageA, pageB) => {
      const prevKey = pageA.frontmatter.star;
      const nextKey = pageB.frontmatter.star;

      if (prevKey && nextKey && prevKey !== nextKey)
        return Number(nextKey) - Number(prevKey);
      if (prevKey && !nextKey) return -1;
      if (!prevKey && nextKey) return 1;

      return compareDate(
        pageA.routeMeta[ArticleInfoType.date],
        pageB.routeMeta[ArticleInfoType.date]
      );
    },

    path: options.star,
    layout: "BlogType",
    frontmatter: (localePath) => ({
      title: themeData.locales[localePath].blogLocales.star,
      feed: false,
      sitemap: false,
    }),
  };

export const getTimelineType = (
  options: BlogPluginOptions,
  themeData: ThemeData
): BlogTypeOptions<
  { git: GitData },
  ThemeNormalPageFrontmatter,
  { routeMeta: ArticleInfo }
> =>
  <
    BlogTypeOptions<
      { git: GitData },
      ThemeNormalPageFrontmatter,
      { routeMeta: ArticleInfo }
    >
  >{
    key: "timeline",
    filter: ({ frontmatter, routeMeta }) =>
      ArticleInfoType.date in routeMeta && frontmatter["timeline"] !== false,
    sorter: (pageA, pageB) =>
      compareDate(
        pageA.routeMeta[ArticleInfoType.date],
        pageB.routeMeta[ArticleInfoType.date]
      ),
    path: options.timeline,
    layout: "Timeline",
    frontmatter: (localePath) => ({
      title: themeData.locales[localePath].blogLocales.timeline,
      feed: false,
      sitemap: false,
    }),
  };

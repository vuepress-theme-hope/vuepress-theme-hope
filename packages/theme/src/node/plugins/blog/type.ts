import { dateSorter } from "@vuepress/helper";
import type { BlogTypeOptions } from "@vuepress/plugin-blog";
import type { GitData } from "@vuepress/plugin-git";

import { defaultPageSorter } from "./utils.js";
import type {
  ArticleInfoData,
  BlogOptions,
  ThemeData,
  ThemeNormalPageFrontmatter,
} from "../../../shared/index.js";
import { ArticleInfo } from "../../../shared/index.js";

/** @private */
export const getBlogArticleType = (
  options: BlogOptions,
  themeData: ThemeData,
): BlogTypeOptions<
  { git: GitData },
  ThemeNormalPageFrontmatter,
  { routeMeta: ArticleInfoData }
> =>
  <
    BlogTypeOptions<
      { git: GitData },
      ThemeNormalPageFrontmatter,
      { routeMeta: ArticleInfoData }
    >
  >{
    key: "article",
    sorter: defaultPageSorter,
    filter: ({ frontmatter, filePathRelative }): boolean =>
      // Not homepage
      !frontmatter.home &&
      // Declaring this is an article
      (frontmatter.article ||
        // Generated from markdown files
        Boolean(frontmatter.article !== false && filePathRelative)),
    path: options.article,
    layout: "BlogType",
    frontmatter: (localePath) => ({
      title: themeData.locales[localePath].blogLocales.article,
      dir: { index: false },
      index: false,
      feed: false,
      sitemap: false,
    }),
  };

/** @private */
export const getBlogStarType = (
  options: BlogOptions,
  themeData: ThemeData,
): BlogTypeOptions<
  { git: GitData },
  ThemeNormalPageFrontmatter,
  { routeMeta: ArticleInfoData }
> =>
  <
    BlogTypeOptions<
      { git: GitData },
      ThemeNormalPageFrontmatter,
      { routeMeta: ArticleInfoData }
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

      return dateSorter(
        pageA.routeMeta[ArticleInfo.date],
        pageB.routeMeta[ArticleInfo.date],
      );
    },

    path: options.star,
    layout: "BlogType",
    frontmatter: (localePath) => ({
      title: themeData.locales[localePath].blogLocales.star,
      dir: { index: false },
      index: false,
      feed: false,
      sitemap: false,
    }),
  };

/** @private */
export const getBlogTimelineType = (
  options: BlogOptions,
  themeData: ThemeData,
): BlogTypeOptions<
  { git: GitData },
  ThemeNormalPageFrontmatter,
  { routeMeta: ArticleInfoData }
> =>
  <
    BlogTypeOptions<
      { git: GitData },
      ThemeNormalPageFrontmatter,
      { routeMeta: ArticleInfoData }
    >
  >{
    key: "timeline",
    filter: ({ frontmatter, routeMeta }) =>
      ArticleInfo.date in routeMeta && frontmatter["timeline"] !== false,
    sorter: (pageA, pageB) =>
      dateSorter(
        pageA.routeMeta[ArticleInfo.date],
        pageB.routeMeta[ArticleInfo.date],
      ),
    path: options.timeline,
    layout: "Timeline",
    frontmatter: (localePath) => ({
      title: themeData.locales[localePath].blogLocales.timeline,
      dir: { index: false },
      index: false,
      feed: false,
      sitemap: false,
    }),
  };

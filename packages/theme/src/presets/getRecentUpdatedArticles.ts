import { dateSorter } from "@vuepress/helper";
import type { BlogTypeOptions } from "@vuepress/plugin-blog";
import type { GitData } from "@vuepress/plugin-git";
import type { Page } from "vuepress";

import type {
  ArticleInfoData,
  ThemeNormalPageFrontmatter,
} from "../shared/index.js";

export interface RecentUpdateArticlesOptions {
  /**
   * Path of this blog type
   *
   * 此博客类型的路径
   *
   * @default "/recent-updated/"
   */
  path?: string;

  /**
   * Locale text for the blog type
   *
   * 博客类型的本地化文字
   *
   * @example {
   *  '/': 'Recent Updated',
   *  '/zh/': '最近更新',
   * }
   */
  locales?: Record<string, string>;
}

export const getRecentUpdatedArticles = ({
  path = "/recent-updated/",
  locales = {},
}: RecentUpdateArticlesOptions): BlogTypeOptions =>
  ({
    key: "recentUpdated",

    filter: ({
      frontmatter,
      filePathRelative,
    }: Page<
      { git: GitData },
      ThemeNormalPageFrontmatter,
      { routeMeta: ArticleInfoData }
    >): boolean =>
      // Declaring this is an article
      frontmatter.article ??
      // Generated from markdown files and not homepage
      (Boolean(filePathRelative) && !frontmatter.home),

    sorter: (
      pageA: Page<
        { git?: GitData },
        ThemeNormalPageFrontmatter,
        { routeMeta: ArticleInfoData }
      >,
      pageB: Page<
        { git?: GitData },
        ThemeNormalPageFrontmatter,
        { routeMeta: ArticleInfoData }
      >,
    ): number =>
      dateSorter(pageA.data.git?.updatedTime, pageB.data.git?.updatedTime),

    path,
    layout: "Blog",
    frontmatter: (localePath: string) => ({
      title: locales[localePath] ?? "Recent Updated",
      dir: { index: false },
      index: false,
      feed: false,
      sitemap: false,
    }),
  }) as unknown as BlogTypeOptions;

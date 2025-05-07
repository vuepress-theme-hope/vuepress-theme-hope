import { dateSorter } from "@vuepress/helper";
import type { BlogTypeOptions } from "@vuepress/plugin-blog";
import type { GitData } from "@vuepress/plugin-git";
import type { Page } from "vuepress";

import type {
  ArticleInfoData,
  ThemeNormalPageFrontmatter,
} from "../shared/index.js";

export interface SlidesOptions {
  /**
   * Path of this blog type
   *
   * 此博客类型的路径
   *
   * @default "/slides/"
   */
  path?: string;

  /**
   * Locales for the blog type
   *
   * 博客类型的本地化文文字
   *
   * @example {
   *  '/': 'Slides',
   *  '/zh/': '幻灯片',
   * }
   */
  locales?: Record<string, string>;
}

export const getSlides = ({
  path = "/slides/",
  locales = {},
}: SlidesOptions): BlogTypeOptions =>
  ({
    key: "slides",

    filter: ({ frontmatter }: Page): boolean => frontmatter.layout === "Slides",

    sorter: (
      pageA: Page<
        { git: GitData },
        ThemeNormalPageFrontmatter,
        { routeMeta: ArticleInfoData }
      >,
      pageB: Page<
        { git: GitData },
        ThemeNormalPageFrontmatter,
        { routeMeta: ArticleInfoData }
      >,
    ): number => {
      const prevKey = pageA.frontmatter.sticky;
      const nextKey = pageB.frontmatter.sticky;

      if (prevKey && nextKey && prevKey !== nextKey)
        return Number(nextKey) - Number(prevKey);
      if (prevKey && !nextKey) return -1;
      if (!prevKey && nextKey) return 1;

      return dateSorter(pageA.routeMeta.date, pageB.routeMeta.date);
    },

    path,
    layout: "Blog",

    frontmatter: (localePath: string) => ({
      title: locales[localePath] ?? "Slides",
      dir: { index: false },
      index: false,
      feed: false,
      sitemap: false,
    }),
  }) as unknown as BlogTypeOptions;

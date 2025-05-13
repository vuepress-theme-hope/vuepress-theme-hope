import { dateSorter } from "@vuepress/helper";
import type { GitData } from "@vuepress/plugin-git";
import type { Page } from "vuepress/core";

import type {
  ArticleInfoData,
  ThemeNormalPageFrontmatter,
} from "../../../shared/index.js";

export const BLOG_LAYOUT = "Blog";

export const DEFAULT_BLOG_FRONTMATTER = {
  dir: { index: false },
  index: false,
  feed: false,
  sitemap: false,
};

/** @private */
export const defaultPageSorter = (
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
};

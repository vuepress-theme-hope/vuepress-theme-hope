import { dateSorter } from "@vuepress/helper";
import type { GitData } from "@vuepress/plugin-git";
import type { Page } from "vuepress/core";

import type {
  ArticleInfo,
  ThemeNormalPageFrontmatter,
} from "../../../shared/index.js";
import { ArticleInfoType } from "../../../shared/index.js";

/** @private */
export const defaultPageSorter = (
  pageA: Page<
    { git: GitData },
    ThemeNormalPageFrontmatter,
    { routeMeta: ArticleInfo }
  >,
  pageB: Page<
    { git: GitData },
    ThemeNormalPageFrontmatter,
    { routeMeta: ArticleInfo }
  >,
): number => {
  const prevKey = pageA.frontmatter.sticky;
  const nextKey = pageB.frontmatter.sticky;

  if (prevKey && nextKey && prevKey !== nextKey)
    return Number(nextKey) - Number(prevKey);
  if (prevKey && !nextKey) return -1;
  if (!prevKey && nextKey) return 1;

  return dateSorter(
    pageA.routeMeta[ArticleInfoType.date],
    pageB.routeMeta[ArticleInfoType.date],
  );
};

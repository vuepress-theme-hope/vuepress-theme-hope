import { compareDate } from "vuepress-shared/node";
import { ArticleInfoType } from "../../../shared/index.js";

import type { Page } from "@vuepress/core";
import type { GitData } from "@vuepress/plugin-git";
import type {
  ArticleInfo,
  ThemeNormalPageFrontmatter,
} from "../../../shared/index.js";

export const pageSorter = (
  pageA: Page<
    { git: GitData },
    ThemeNormalPageFrontmatter,
    { routeMeta: ArticleInfo }
  >,
  pageB: Page<
    { git: GitData },
    ThemeNormalPageFrontmatter,
    { routeMeta: ArticleInfo }
  >
): number => {
  const prevKey = pageA.frontmatter.sticky;
  const nextKey = pageB.frontmatter.sticky;

  if (prevKey && nextKey && prevKey !== nextKey)
    return Number(nextKey) - Number(prevKey);
  if (prevKey && !nextKey) return -1;
  if (!prevKey && nextKey) return 1;

  return compareDate(
    pageA.routeMeta[ArticleInfoType.date],
    pageB.routeMeta[ArticleInfoType.date]
  );
};

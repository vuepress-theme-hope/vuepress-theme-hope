import type { Page } from "@vuepress/core";

import type {
  ThemeBlogHomePageFrontmatter,
  ThemeNormalPageFrontmatter,
  ThemePageData,
  ThemeProjectHomePageFrontmatter,
} from "../../../shared/index.js";

/** @private */
export const blogFilter = ({
  frontmatter,
  filePathRelative,
}: Page<ThemePageData>): boolean => {
  const pageFrontmatter = frontmatter as
    | ThemeProjectHomePageFrontmatter
    | ThemeBlogHomePageFrontmatter
    | ThemeNormalPageFrontmatter;

  const isArticle =
    // not home
    !pageFrontmatter.home &&
    // declaring this is an article
    (pageFrontmatter.article ||
      // generated from markdown files
      Boolean(pageFrontmatter.article !== false && filePathRelative));

  return isArticle;
};

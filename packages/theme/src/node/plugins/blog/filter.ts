import type { Page } from "vuepress/core";

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
    /// Declaring this is an article
    pageFrontmatter.article ??
    // Generated from markdown files and not homepage
    (!pageFrontmatter.home && Boolean(filePathRelative));

  return isArticle;
};

import type { Page } from "@vuepress/core";
import type {
  ThemePageData,
  ThemeBlogHomePageFrontmatter,
  ThemeProjectHomePageFrontmatter,
  ThemeNormalPageFrontmatter,
} from "../../../shared/index.js";

export const filter = ({
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

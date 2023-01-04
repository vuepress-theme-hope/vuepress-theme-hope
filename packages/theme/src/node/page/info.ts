import { ArticleInfoType } from "../../shared/index.js";

import type { Page } from "@vuepress/core";
import type {
  ThemeBlogHomePageFrontmatter,
  ThemeNormalPageFrontmatter,
  ThemePageData,
  ThemeProjectHomePageFrontmatter,
} from "../../shared/index.js";

export const injectPageInfo = (page: Page<ThemePageData>): void => {
  const { filePathRelative } = page;
  const frontmatter = page.frontmatter as
    | ThemeProjectHomePageFrontmatter
    | ThemeBlogHomePageFrontmatter
    | ThemeNormalPageFrontmatter;

  // save relative file path into page data to generate edit link
  page.data.filePathRelative = filePathRelative;

  page.routeMeta["title"] = page.title;

  if ("icon" in frontmatter)
    page.routeMeta[ArticleInfoType.icon] = frontmatter.icon;

  // resolve shortTitle
  if ("shortTitle" in frontmatter)
    page.routeMeta[ArticleInfoType.shortTitle] = frontmatter.shortTitle;
};

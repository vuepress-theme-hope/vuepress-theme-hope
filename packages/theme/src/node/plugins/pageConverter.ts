import { injectLocalizedDate } from "vuepress-shared";
import { convertFrontmatter } from "../compact/index.js";
import { checkFrontmatter } from "../frontmatter/check.js";
import { ArticleInfoType } from "../../shared/index.js";

import type { App, Page, PluginObject } from "@vuepress/core";
import type {
  ThemeBlogHomePageFrontmatter,
  ThemePageData,
  ThemeProjectHomePageFrontmatter,
  ThemeNormalPageFrontmatter,
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

export const extendsPagePlugin = (legacy = false): PluginObject => ({
  name: "vuepress-theme-hope-extends-page",

  extendsPage: (page, app): void => {
    if (legacy)
      page.frontmatter = convertFrontmatter(
        page.frontmatter,
        page.filePathRelative || ""
      );

    checkFrontmatter(page, app.env.isDebug);
    injectLocalizedDate(page);
    injectPageInfo(<Page<ThemePageData>>page);
  },
});

export const useExtendsPagePlugin = (app: App, legacy = false): void => {
  app.use(extendsPagePlugin(legacy));
};

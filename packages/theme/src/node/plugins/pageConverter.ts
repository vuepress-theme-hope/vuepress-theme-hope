import { endsWith, isPlainObject, keys, startsWith } from "@vuepress/helper";
import type { App, Page, PluginObject } from "vuepress/core";
import { injectLocalizedDate } from "vuepress-shared/node";

import type {
  ThemeBlogHomePageFrontmatter,
  ThemeData,
  ThemeNormalPageFrontmatter,
  ThemePageData,
  ThemeProjectHomePageFrontmatter,
} from "../../shared/index.js";
import { ArticleInfoType, PageType } from "../../shared/index.js";
import { checkFrontmatter } from "../check/index.js";
import { convertFrontmatter } from "../compact/index.js";
import type { HopeThemeBehaviorOptions } from "../typings/index.js";

/**
 * @private
 *
 * Inject basic page info
 */
export const injectPageInfo = (page: Page<ThemePageData>): void => {
  const { filePathRelative } = page;
  const frontmatter = page.frontmatter as
    | ThemeProjectHomePageFrontmatter
    | ThemeBlogHomePageFrontmatter
    | ThemeNormalPageFrontmatter;

  const isArticle =
    // Declaring this is an article
    frontmatter.article ||
    // Generated from markdown files
    Boolean(frontmatter.article !== false && filePathRelative);
  const isSlide = frontmatter.layout === "Slide";

  // Save page type to routeMeta
  page.routeMeta[ArticleInfoType.type] = frontmatter.home
    ? PageType.home
    : isSlide
      ? PageType.slide
      : isArticle
        ? PageType.article
        : PageType.page;

  // Save relative file path into page data to generate edit link
  page.data.filePathRelative = filePathRelative;

  page.routeMeta[ArticleInfoType.title] = page.title;

  if ("icon" in frontmatter)
    page.routeMeta[ArticleInfoType.icon] = frontmatter.icon;

  // Catalog related
  if (endsWith(page.path, "/")) {
    if (isPlainObject(frontmatter.dir)) {
      if ("order" in frontmatter.dir)
        page.routeMeta[ArticleInfoType.order] = (
          frontmatter as ThemeNormalPageFrontmatter
        ).dir!.order;

      if (
        "index" in frontmatter.dir &&
        (frontmatter as ThemeNormalPageFrontmatter).dir!.index === false
      )
        page.routeMeta[ArticleInfoType.index] = false;
    }
  } else {
    if ("order" in frontmatter)
      page.routeMeta[ArticleInfoType.order] = frontmatter.order;
    if ("index" in frontmatter && frontmatter.index === false)
      page.routeMeta[ArticleInfoType.index] = false;
  }

  // Resolve shortTitle
  if ("shortTitle" in frontmatter)
    page.routeMeta[ArticleInfoType.shortTitle] = frontmatter.shortTitle;
};

export const extendsPagePlugin = (
  themeData: ThemeData,
  behavior: HopeThemeBehaviorOptions,
): PluginObject => {
  const encryptedPaths = keys(themeData.encrypt.config || {});
  const isPageEncrypted = ({ path }: Page): boolean =>
    encryptedPaths.some((key) => startsWith(decodeURI(path), key));

  return {
    name: "vuepress-theme-hope-extends-page",

    extendsPage: (page): void => {
      if (behavior.compact)
        page.frontmatter = convertFrontmatter(
          page.frontmatter,
          page.filePathRelative,
        );
      if (behavior.check) checkFrontmatter(page);

      const isEncrypted = isPageEncrypted(page);

      // Encrypt page shall not appear in feed items or perform seo
      if (isEncrypted) {
        page.frontmatter["feed"] = false;
        page.frontmatter["seo"] = false;
      }

      injectPageInfo(<Page<ThemePageData>>page);
      injectLocalizedDate(page);
    },
  };
};

export const useExtendsPagePlugin = (
  app: App,
  themeData: ThemeData,
  behavior: HopeThemeBehaviorOptions,
): void => {
  app.use(extendsPagePlugin(themeData, behavior));
};

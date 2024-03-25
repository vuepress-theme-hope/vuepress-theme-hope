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
import { PageInfo } from "../../shared/index.js";
import { checkFrontmatter } from "../check/index.js";
import { convertFrontmatter } from "../compact/index.js";
import type { HopeThemeBehaviorOptions } from "../typings/index.js";

/**
 * @private
 *
 * Inject basic page info
 */
export const injectPageInfo = (page: Page<ThemePageData>): void => {
  const frontmatter = page.frontmatter as
    | ThemeProjectHomePageFrontmatter
    | ThemeBlogHomePageFrontmatter
    | ThemeNormalPageFrontmatter;

  // Set title
  page.routeMeta[PageInfo.title] = page.title;

  // Set short title
  if ("shortTitle" in frontmatter)
    page.routeMeta[PageInfo.shortTitle] = frontmatter.shortTitle;

  // Set icon
  if ("icon" in frontmatter) page.routeMeta[PageInfo.icon] = frontmatter.icon;

  // Catalog related
  if (endsWith(page.path, "/")) {
    if (isPlainObject(frontmatter.dir)) {
      if ("order" in frontmatter.dir)
        page.routeMeta[PageInfo.order] = (
          frontmatter as ThemeNormalPageFrontmatter
        ).dir!.order;

      if (
        "index" in frontmatter.dir &&
        (frontmatter as ThemeNormalPageFrontmatter).dir!.index === false
      )
        page.routeMeta[PageInfo.index] = false;
    }
  } else {
    if ("order" in frontmatter)
      page.routeMeta[PageInfo.order] = frontmatter.order;
    if ("index" in frontmatter && frontmatter.index === false)
      page.routeMeta[PageInfo.index] = false;
  }

  // breadcrumb
  if (frontmatter.breadcrumbExclude)
    page.routeMeta[PageInfo.breadcrumbExclude] = true;
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
      const { filePathRelative } = page;

      if (behavior.compact)
        page.frontmatter = convertFrontmatter(
          page.frontmatter,
          filePathRelative,
        );
      if (behavior.check) checkFrontmatter(page);

      const isEncrypted = isPageEncrypted(page);

      // Encrypt page shall not appear in feed items or perform seo
      if (isEncrypted) {
        page.frontmatter["feed"] = false;
        page.frontmatter["seo"] = false;
      }

      const enableEditLink =
        themeData.locales[page.pathLocale].editLink ?? true;

      // Set edit link
      if (enableEditLink)
        // Save relative file path into page data to generate edit link
        (<Page<ThemePageData>>page).data.filePathRelative = filePathRelative;

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

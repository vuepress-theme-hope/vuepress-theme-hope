import { endsWith, isPlainObject, keys, startsWith } from "@vuepress/helper";
import type { App, Page, PluginObject } from "vuepress/core";

import type {
  StructureSidebarDirOptions,
  ThemeBlogHomePageFrontmatter,
  ThemeData,
  ThemeNormalPageFrontmatter,
  ThemePageData,
  ThemeProjectHomePageFrontmatter,
} from "../../shared/index.js";
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
  page.routeMeta.title = page.title;

  // Set short title
  if (frontmatter.shortTitle)
    page.routeMeta.shortTitle = frontmatter.shortTitle;

  // Set icon
  if (frontmatter.icon) page.routeMeta.icon = frontmatter.icon;

  // Catalog related
  if (endsWith(page.path, "/")) {
    if (isPlainObject(frontmatter.dir)) {
      if ("order" in frontmatter.dir)
        page.routeMeta.order = (
          frontmatter.dir as StructureSidebarDirOptions
        ).order;

      if (frontmatter.dir.index === false) page.routeMeta.index = false;
    }
  } else {
    if ("order" in frontmatter) page.routeMeta.order = frontmatter.order;
    if (frontmatter.index === false) page.routeMeta.index = false;
  }

  // breadcrumb
  if (frontmatter.breadcrumbExclude) page.routeMeta.breadcrumbExclude = true;
};

export const extendsPagePlugin = (
  themeData: ThemeData,
  behavior: HopeThemeBehaviorOptions,
): PluginObject => {
  const encryptedPaths = keys(themeData.encrypt.config ?? {});
  const isPageEncrypted = ({ path }: Page): boolean =>
    encryptedPaths.some((key) => startsWith(decodeURI(path), key));

  return {
    name: "vuepress-theme-hope-extends-page",

    extendsPage: (page): void => {
      const { filePathRelative } = page;

      if (behavior.compact)
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        page.frontmatter = convertFrontmatter(
          page.frontmatter,
          filePathRelative ?? "",
        );
      if (behavior.check) checkFrontmatter(page);

      const isEncrypted = isPageEncrypted(page);

      // Encrypt page shall not appear in feed items or perform seo
      if (isEncrypted) {
        page.frontmatter.feed = false;
        page.frontmatter.seo = false;
      }

      const enableEditLink =
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        themeData.locales[page.pathLocale]?.editLink ?? true;

      // Set edit link
      if (enableEditLink)
        // Save relative file path into page data to generate edit link
        (page as Page<ThemePageData>).data.filePathRelative = filePathRelative;

      injectPageInfo(page as Page<ThemePageData>);
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

import { isPlainObject } from "@vuepress/helper";
import type { CopyrightPluginOptions } from "@vuepress/plugin-copyright";
import { copyrightPlugin } from "@vuepress/plugin-copyright";
import type { Page, Plugin } from "vuepress/core";

import type { ThemeData, ThemeNormalPageFrontmatter } from "../../shared/index.js";
import { getAuthor } from "../../shared/index.js";

/**
 * Resolve options for `@vuepress/plugin-copyright`
 *
 * @param themeData - Theme data
 * @param options - User options
 * @param hostname - Hostname
 * @returns Copyright plugin instance or `null`
 */
export const getCopyrightPlugin = (
  themeData: ThemeData,
  options?: Partial<CopyrightPluginOptions> | boolean,
  hostname?: string,
): Plugin | null => {
  if (!options) return null;

  return copyrightPlugin({
    canonical: hostname,
    author: getAuthor(themeData.author ?? themeData.locales["/"].author)[0]?.name,
    license: themeData.license,
    // oxlint-disable-next-line typescript/no-unnecessary-type-arguments
    authorGetter: (page: Page<Record<string, never>, ThemeNormalPageFrontmatter>) =>
      getAuthor(page.frontmatter.author)[0]?.name,
    // oxlint-disable-next-line typescript/no-unnecessary-type-arguments
    licenseGetter: (page: Page<Record<string, never>, ThemeNormalPageFrontmatter>) =>
      page.frontmatter.license,
    ...(isPlainObject(options) ? options : { global: true }),
  } as CopyrightPluginOptions);
};

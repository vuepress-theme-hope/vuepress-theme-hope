import type { Page, Plugin } from "@vuepress/core";
import { colors } from "@vuepress/utils";
import type { CopyrightOptions } from "vuepress-plugin-copyright2";
import { getAuthor, isPlainObject } from "vuepress-shared/node";

import type {
  ThemeData,
  ThemeNormalPageFrontmatter,
} from "../../shared/index.js";
import { logger } from "../utils.js";

let copyrightPlugin: (options: CopyrightOptions, legacy?: boolean) => Plugin;

try {
  ({ copyrightPlugin } = await import("vuepress-plugin-copyright2"));
} catch (e) {
  // do nothing
}

/**
 * @private
 *
 * Resolve options for vuepress-plugin-copyright
 */
export const getCopyrightPlugin = (
  themeData: ThemeData,
  options?: Partial<CopyrightOptions> | boolean,
  hostname?: string,
  legacy = false,
): Plugin | null => {
  if (!options) return null;

  if (!copyrightPlugin) {
    logger.error(
      `${colors.cyan("vuepress-plugin-copyright2")} is not installed!`,
    );

    return null;
  }

  return copyrightPlugin(
    <CopyrightOptions>{
      canonical: hostname,
      author: (page: Page<Record<string, never>, ThemeNormalPageFrontmatter>) =>
        getAuthor(page.frontmatter.author)?.[0]?.name ||
        getAuthor(themeData.author)?.[0]?.name ||
        "",
      ...(isPlainObject(options) ? options : { global: true }),
    },
    legacy,
  );
};

import {
  getFullLocaleConfig,
  isPlainObject,
  keys,
  startsWith,
} from "@vuepress/helper";
import type { DocSearchPluginOptions } from "@vuepress/plugin-docsearch";
import type { MeiliSearchPluginOptions } from "@vuepress/plugin-meilisearch";
import type { SearchPluginOptions } from "@vuepress/plugin-search";
import type { SlimSearchPluginOptions } from "@vuepress/plugin-slimsearch";
import type { App, Page, Plugin } from "vuepress/core";

import { logMissingPkg } from "./utils.js";
import type {
  ThemeBasePageFrontmatter,
  ThemeData,
} from "../../shared/index.js";
import { themeLocaleInfo } from "../locales/index.js";
import type { ThemePluginsOptions } from "../typings/index.js";

let docsearchPlugin: ((options: DocSearchPluginOptions) => Plugin) | null =
  null;
let meilisearchPlugin: ((options: MeiliSearchPluginOptions) => Plugin) | null =
  null;
let searchPlugin: ((options: SearchPluginOptions) => Plugin) | null = null;
let slimsearchPlugin: ((options: SlimSearchPluginOptions) => Plugin) | null =
  null;

try {
  ({ docsearchPlugin } = await import("@vuepress/plugin-docsearch"));
} catch {
  // Do nothing
}

try {
  ({ meilisearchPlugin } = await import("@vuepress/plugin-meilisearch"));
} catch {
  // Do nothing
}

try {
  ({ searchPlugin } = await import("@vuepress/plugin-search"));
} catch {
  // Do nothing
}

try {
  ({ slimsearchPlugin } = await import("@vuepress/plugin-slimsearch"));
} catch {
  // Do nothing
}

/**
 * @private
 *
 * Resolve options for @vuepress/plugin-docsearch, @vuepress/plugin-search and @vuepress/plugin-slimsearch
 */
export const getSearchPlugin = (
  app: App,
  themeData: ThemeData,
  plugins: ThemePluginsOptions,
): Plugin | null => {
  const encryptedPaths = keys(themeData.encrypt.config ?? {});
  const isPageEncrypted = ({ path }: Page): boolean =>
    encryptedPaths.some((key) => startsWith(decodeURI(path), key));

  if (isPlainObject(plugins.docsearch)) {
    if (!docsearchPlugin) {
      logMissingPkg("@vuepress/plugin-docsearch");

      return null;
    }

    return docsearchPlugin(plugins.docsearch);
  }

  if (isPlainObject(plugins.meilisearch)) {
    if (!meilisearchPlugin) {
      logMissingPkg("@vuepress/plugin-meilisearch");

      return null;
    }

    return meilisearchPlugin(plugins.meilisearch);
  }

  if (plugins.slimsearch) {
    if (!slimsearchPlugin) {
      logMissingPkg("@vuepress/plugin-slimsearch");

      return null;
    }

    return slimsearchPlugin({
      indexContent: true,
      // Add supports for category and tags
      customFields: [
        {
          getter: (
            page: Page<Record<never, never>, ThemeBasePageFrontmatter>,
          ) => page.frontmatter.category,
          formatter: getFullLocaleConfig({
            app,
            default: themeLocaleInfo.map(([langs, { blogLocales }]) => [
              langs,
              `${blogLocales.category}: $content`,
            ]),
          }),
        },
        {
          getter: (
            page: Page<Record<never, never>, ThemeBasePageFrontmatter>,
          ) => page.frontmatter.tag,
          formatter: getFullLocaleConfig({
            app,
            default: themeLocaleInfo.map(([langs, { blogLocales }]) => [
              langs,
              `${blogLocales.tag}: $content`,
            ]),
          }),
        },
      ],
      filter: (page) => !isPageEncrypted(page),
      ...(isPlainObject(plugins.slimsearch) ? plugins.slimsearch : {}),
    });
  }

  if (plugins.search) {
    if (!searchPlugin) {
      logMissingPkg("@vuepress/plugin-search");

      return null;
    }

    return searchPlugin({
      isSearchable: (page) => !isPageEncrypted(page),
      ...(isPlainObject(plugins.search) ? plugins.search : {}),
    });
  }

  return null;
};

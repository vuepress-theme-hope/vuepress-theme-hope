import {
  getFullLocaleConfig,
  getRootLang,
  isPlainObject,
  keys,
  startsWith,
} from "@vuepress/helper";
import type { DocSearchPluginOptions } from "@vuepress/plugin-docsearch";
import type { MeiliSearchPluginOptions } from "@vuepress/plugin-meilisearch";
import type { SearchPluginOptions } from "@vuepress/plugin-search";
import type { SlimSearchPluginOptions } from "@vuepress/plugin-slimsearch";
import type { App, Page, Plugin } from "vuepress/core";
import { colors } from "vuepress/utils";

import type {
  PluginsOptions,
  ThemeBasePageFrontmatter,
  ThemeData,
} from "../../shared/index.js";
import { themeLocaleInfo } from "../locales/index.js";
import { logger } from "../utils.js";

let docsearchPlugin: ((options: DocSearchPluginOptions) => Plugin) | null =
  null;
let meilisearchPlugin: ((options: MeiliSearchPluginOptions) => Plugin) | null =
  null;
let searchPlugin: ((options: SearchPluginOptions) => Plugin) | null = null;
let slimsearchPlugin: ((options: SlimSearchPluginOptions) => Plugin) | null =
  null;
let cut: ((content: string, strict?: boolean) => string[]) | null = null;

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
  ({ cut } = await import("nodejs-jieba"));
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
  plugins: PluginsOptions,
): Plugin | null => {
  const encryptedPaths = keys(themeData.encrypt.config ?? {});
  const isPageEncrypted = ({ path }: Page): boolean =>
    encryptedPaths.some((key) => startsWith(decodeURI(path), key));
  const { locales } = app.options;

  if (isPlainObject(plugins.docsearch)) {
    if (!docsearchPlugin) {
      logger.error(
        `${colors.cyan("@vuepress/plugin-docsearch")} is not installed!`,
      );

      return null;
    }

    return docsearchPlugin(plugins.docsearch);
  }

  if (isPlainObject(plugins.meilisearch)) {
    if (!meilisearchPlugin) {
      logger.error(
        `${colors.cyan("@vuepress/plugin-meilisearch")} is not installed!`,
      );

      return null;
    }

    return meilisearchPlugin(plugins.meilisearch);
  }

  if (plugins.slimsearch) {
    if (!slimsearchPlugin) {
      logger.error(
        `${colors.cyan("@vuepress/plugin-slimsearch")} is not installed!`,
      );

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
      ...(cut
        ? {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            indexLocaleOptions: locales["/zh/"]
              ? {
                  "/zh/": {
                    tokenize: (text, fieldName) =>
                      fieldName === "id" ? [text] : cut(text, true),
                  },
                }
              : // eslint-disable-next-line @typescript-eslint/no-deprecated
                getRootLang(app).startsWith("zh")
                ? {
                    "/": {
                      tokenize: (text, fieldName) =>
                        fieldName === "id" ? [text] : cut(text, true),
                    },
                  }
                : {},
          }
        : {}),
      ...(isPlainObject(plugins.slimsearch) ? plugins.slimsearch : {}),
    });
  }

  if (plugins.search) {
    if (!searchPlugin) {
      logger.error(
        `${colors.cyan("@vuepress/plugin-search")} is not installed!`,
      );

      return null;
    }

    return searchPlugin({
      isSearchable: (page) => !isPageEncrypted(page),
      ...(isPlainObject(plugins.search) ? plugins.search : {}),
    });
  }

  return null;
};

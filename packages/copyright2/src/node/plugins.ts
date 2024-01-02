import type { Page, PluginFunction } from "@vuepress/core";
import { colors } from "@vuepress/utils";
import {
  addViteSsrNoExternal,
  checkVersion,
  getLocales,
} from "vuepress-shared/node";

import { convertOptions } from "./compact.js";
import { copyrightLocales } from "./locales.js";
import type { CopyrightOptions } from "./options.js";
import { CLIENT_FOLDER, PLUGIN_NAME, logger } from "./utils.js";
import type {
  CopyrightInfoData,
  CopyrightPluginPageData,
} from "../shared/index.js";

export const copyrightPlugin =
  (options: CopyrightOptions, legacy = true): PluginFunction =>
  (app) => {
    // TODO: Remove this in v2 stable
    if (legacy)
      convertOptions(options as CopyrightOptions & Record<string, unknown>);

    checkVersion(app, PLUGIN_NAME, "2.0.0-rc.0");

    if (app.env.isDebug) logger.info("Options:", options);

    const {
      canonical,
      author = "",
      authorGetter,
      license = "",
      licenseGetter,
      copyrightGetter,
      disableCopy = false,
      disableSelection = false,
      global = false,
      triggerLength = 100,
      maxLength = 0,
    } = options;

    const locales = getLocales({
      app,
      name: PLUGIN_NAME,
      default: copyrightLocales,
      config: options.locales,
    });

    return {
      name: PLUGIN_NAME,

      define: (): Record<string, unknown> => ({
        COPYRIGHT_CANONICAL: canonical || "",
        COPYRIGHT_DEFAULT_AUTHOR: author || "",
        COPYRIGHT_DEFAULT_LICENSE: license || "",
        COPYRIGHT_GLOBAL: global,
        COPYRIGHT_DISABLE_COPY: disableCopy,
        COPYRIGHT_DISABLE_SELECTION: disableSelection,
        COPYRIGHT_LOCALES: locales,
        COPYRIGHT_MAX_LENGTH: maxLength,
        COPYRIGHT_TRIGGER_LENGTH: triggerLength,
      }),

      extendsPage: (page: Page<Partial<CopyrightPluginPageData>>): void => {
        const authorText = authorGetter?.(page) ?? author;
        const licenseText = licenseGetter?.(page) ?? license;
        const copyright = copyrightGetter?.(page);

        // TODO: Remove this in v2 stable
        if (page.frontmatter["triggerWords"]) {
          logger.warn(
            `The ${colors.cyan(
              "triggerWords",
            )} option is deprecated, use ${colors.cyan(
              "triggerLength",
            )} instead${
              page.filePathRelative
                ? `, found in ${page.filePathRelative}`
                : "."
            }`,
          );

          page.frontmatter["triggerLength"] = page.frontmatter["triggerWords"];
        }

        if (copyright) {
          page.data.copyright = copyright;
        } else {
          const hasDifferentAuthor = authorText && authorText !== author;
          const hasDifferentLicense = licenseText && licenseText !== license;

          if (hasDifferentAuthor || hasDifferentLicense) {
            const copyrightInfo: CopyrightInfoData = {};

            if (hasDifferentAuthor) copyrightInfo.author = authorText;
            if (hasDifferentLicense) copyrightInfo.license = licenseText;
            page.data.copyright = copyrightInfo;
          }
        }
      },

      extendsBundlerOptions: (bundlerOptions: unknown, app): void => {
        addViteSsrNoExternal(bundlerOptions, app, "vuepress-shared");
      },

      clientConfigFile: `${CLIENT_FOLDER}config.js`,
    };
  };

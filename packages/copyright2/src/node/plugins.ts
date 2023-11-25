import type { Page, PluginFunction } from "@vuepress/core";
import { colors } from "@vuepress/utils";
import {
  addViteSsrNoExternal,
  checkVersion,
  getLocales,
  isFunction,
} from "vuepress-shared/node";

import { convertOptions } from "./compact.js";
import { copyrightLocales } from "./locales.js";
import type { CopyrightOptions } from "./options.js";
import { CLIENT_FOLDER, PLUGIN_NAME, logger } from "./utils.js";
import type { CopyrightPluginPageData } from "../shared/index.js";

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
      license = "",
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
        COPYRIGHT_GLOBAL: global,
        COPYRIGHT_DISABLE_COPY: disableCopy,
        COPYRIGHT_DISABLE_SELECTION: disableSelection,
        COPYRIGHT_LOCALES: locales,
        COPYRIGHT_MAX_LENGTH: maxLength,
        COPYRIGHT_TRIGGER_LENGTH: triggerLength,
      }),

      extendsPage: (page: Page<Partial<CopyrightPluginPageData>>): void => {
        const authorText = isFunction(author) ? author(page) : author;

        const licenseText = isFunction(license) ? license(page) : license;

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

        page.data.copyright = {
          ...(authorText ? { author: authorText } : {}),
          ...(licenseText ? { license: licenseText } : {}),
        };
      },

      extendsBundlerOptions: (bundlerOptions: unknown, app): void => {
        addViteSsrNoExternal(bundlerOptions, app, "vuepress-shared");
      },

      clientConfigFile: `${CLIENT_FOLDER}config.js`,
    };
  };

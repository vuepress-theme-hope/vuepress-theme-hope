import { type Page, type PluginFunction } from "@vuepress/core";
import { getDirname, path } from "@vuepress/utils";
import { checkVersion, getLocales, isFunction } from "vuepress-shared/node";

import { copyrightLocales } from "./locales.js";
import { type CopyrightOptions } from "./options.js";
import { PLUGIN_NAME, logger } from "./utils.js";
import { type CopyrightPluginPageData } from "../shared/index.js";

const __dirname = getDirname(import.meta.url);

export const copyrightPlugin =
  (options: CopyrightOptions): PluginFunction =>
  (app) => {
    checkVersion(app, PLUGIN_NAME, "2.0.0-beta.62");

    if (app.env.isDebug) logger.info("Options:", options);

    const {
      canonical,
      author = "",
      license = "",
      disableCopy = false,
      disableSelection = false,
      global = false,
      triggerWords = 100,
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
        COPYRIGHT_TRIGGER_WORDS: triggerWords,
      }),

      extendsPage: (page: Page<Partial<CopyrightPluginPageData>>): void => {
        const authorText = isFunction(author) ? author(page) : author;

        const licenseText = isFunction(license) ? license(page) : license;

        page.data.copyright = {
          ...(authorText ? { author: authorText } : {}),
          ...(licenseText ? { license: licenseText } : {}),
        };
      },

      clientConfigFile: path.resolve(__dirname, "../client/config.js"),
    };
  };

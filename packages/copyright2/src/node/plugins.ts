import { getDirname, path } from "@vuepress/utils";
import { getLocales } from "vuepress-shared/node";

import { copyrightLocales } from "./locales.js";
import { logger } from "./utils.js";

import type { Page, PluginFunction } from "@vuepress/core";
import type { CopyrightOptions } from "./options.js";
import type { CopyrightPluginPageData } from "../shared/index.js";

const __dirname = getDirname(import.meta.url);

export const copyrightPlugin =
  (options: CopyrightOptions): PluginFunction =>
  (app) => {
    if (app.env.isDebug) logger.info(`Options: ${options.toString()}`);

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
      name: "copyright",
      default: copyrightLocales,
      config: options.locales,
    });

    return {
      name: "vuepress-plugin-copyright2",

      define: (): Record<string, unknown> => ({
        COPYRIGHT_CANONICAL: canonical || "",
        COPYRIGHT_GLOBAL: global,
        COPYRIGHT_DISABLE_COPY: disableCopy,
        COPYRIGHT_DISABLE_SELECTION: disableSelection,
        COPYRIGHT_LOCALES: locales,
        COPYRIGHT_TRIGGER_WORDS: triggerWords,
      }),

      extendsPage: (page: Page<Partial<CopyrightPluginPageData>>): void => {
        const authorText = typeof author === "function" ? author(page) : author;

        const licenseText =
          typeof license === "function" ? license(page) : license;

        page.data.copyright = {
          ...(authorText ? { author: authorText } : {}),
          ...(licenseText ? { license: licenseText } : {}),
        };
      },

      clientConfigFile: path.resolve(__dirname, "../client/config.js"),
    };
  };

import { removeEndingSlash, removeLeadingSlash } from "@vuepress/shared";
import { path } from "@vuepress/utils";
import { getLocales } from "vuepress-shared";

import { copyrightLocales } from "./locales";
import { logger } from "./utils";

import type { Page, PluginFunction } from "@vuepress/core";
import type { CopyrightOptions } from "../shared";

export const copyrightPlugin =
  (options: CopyrightOptions): PluginFunction =>
  (app) => {
    if (app.env.isDebug) logger.info(`Options: ${options.toString()}`);

    const {
      hostname,
      author = "",
      license = "",
      disableCopy = false,
      disableSelection = false,
      global = false,
      triggerWords = 100,
      locales,
    } = options;

    const currentlocales = getLocales({
      app,
      name: "copyright",
      default: copyrightLocales,
      config: locales,
    });

    return {
      name: "vuepress-plugin-copyright2",

      define: (): Record<string, unknown> => ({
        COPYRIGHT_GLOBAL: global,
        COPYRIGHT_DISABLE_COPY: disableCopy,
        COPYRIGHT_DISABLE_SELECTION: disableSelection,
        COPYRIGHT_TRIGGER_WORDS: triggerWords,
      }),

      extendsPage: (page: Page<{ copyright?: string }>, app): void => {
        const { base } = app.options;
        const locale = currentlocales[page.pathLocale];

        const authorText = author
          ? locale.author.replace(
              ":author",
              typeof author === "function" ? author(page) : author
            )
          : "";

        const licenseText = license
          ? locale.license.replace(
              ":license",
              typeof license === "function" ? license(page) : license
            )
          : "";

        const linkText = hostname
          ? locale.link.replace(
              ":link",
              `${removeEndingSlash(hostname)}${base}${removeLeadingSlash(
                page.path
              )}`
            )
          : "";

        page.data.copyright = [authorText, licenseText, linkText]
          .filter((item) => item)
          .join("\n");
      },

      clientConfigFile: path.resolve(__dirname, "../client/config.js"),
    };
  };

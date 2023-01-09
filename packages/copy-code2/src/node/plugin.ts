import { getDirname, path } from "@vuepress/utils";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import { addViteSsrNoExternal, getLocales } from "vuepress-shared/node";

import { copyCodeLocales } from "./locales.js";
import { logger } from "./utils.js";

import type { PluginFunction } from "@vuepress/core";
import type { CopyCodeOptions } from "./options.js";

const __dirname = getDirname(import.meta.url);

export const copyCodePlugin =
  (options: CopyCodeOptions = {}): PluginFunction =>
  (app) => {
    if (app.env.isDebug) logger.info("Options:", options);

    useSassPalettePlugin(app, { id: "hope" });

    const userCopyCodeLocales = getLocales({
      app,
      name: "copy-code",
      default: copyCodeLocales,
      config: options.locales,
    });

    return {
      name: "vuepress-plugin-copy-code2",

      define: (): Record<string, unknown> => ({
        COPY_CODE_DELAY: options.delay || 800,
        COPY_CODE_DURATION: options.duration || 2000,
        COPY_CODE_PURE: options.pure || false,
        COPY_CODE_SHOW_IN_MOBILE: options.showInMobile || false,
        COPY_CODE_LOCALES: userCopyCodeLocales,
        COPY_CODE_SELECTOR:
          options.selector ||
          '.theme-default-content div[class*="language-"] pre',
      }),

      extendsBundlerOptions: (bundlerOptions: unknown, app): void => {
        addViteSsrNoExternal(bundlerOptions, app, "vuepress-shared");
      },

      clientConfigFile: path.resolve(__dirname, "../client/config.js"),
    };
  };

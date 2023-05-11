import { type PluginFunction } from "@vuepress/core";
import { getDirname, path } from "@vuepress/utils";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import {
  addViteSsrNoExternal,
  checkVersion,
  getLocales,
  isArray,
  isString,
} from "vuepress-shared/node";

import { copyCodeLocales } from "./locales.js";
import { type CopyCodeOptions } from "./options.js";
import { PLUGIN_NAME, logger } from "./utils.js";

const __dirname = getDirname(import.meta.url);

export const copyCodePlugin =
  (options: CopyCodeOptions = {}): PluginFunction =>
  (app) => {
    checkVersion(app, PLUGIN_NAME, "2.0.0-beta.62");

    if (app.env.isDebug) logger.info("Options:", options);

    useSassPalettePlugin(app, { id: "hope" });

    const userCopyCodeLocales = getLocales({
      app,
      name: PLUGIN_NAME,
      default: copyCodeLocales,
      config: options.locales,
    });

    return {
      name: PLUGIN_NAME,

      define: (): Record<string, unknown> => ({
        COPY_CODE_DELAY: options.delay || 800,
        COPY_CODE_DURATION: options.duration || 2000,
        COPY_CODE_FANCY: options.fancy || false,
        COPY_CODE_SHOW_IN_MOBILE: options.showInMobile || false,
        COPY_CODE_LOCALES: userCopyCodeLocales,
        COPY_CODE_SELECTOR: isArray(options.selector)
          ? options.selector
          : isString(options.selector)
          ? [options.selector]
          : ['.theme-default-content div[class*="language-"] pre'],
      }),

      extendsBundlerOptions: (bundlerOptions: unknown, app): void => {
        addViteSsrNoExternal(bundlerOptions, app, "vuepress-shared");
      },

      clientConfigFile: path.resolve(__dirname, "../client/config.js"),
    };
  };

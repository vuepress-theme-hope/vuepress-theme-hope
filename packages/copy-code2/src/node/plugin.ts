import {
  addViteSsrNoExternal,
  getLocaleConfig,
  isArray,
  isString,
} from "@vuepress/helper/node";
import type { PluginFunction } from "vuepress/core";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";

import { convertOptions } from "./compact.js";
import { copyCodeLocales } from "./locales.js";
import type { CopyCodeOptions } from "./options.js";
import { CLIENT_FOLDER, PLUGIN_NAME, logger } from "./utils.js";

export const copyCodePlugin =
  (options: CopyCodeOptions = {}, legacy = true): PluginFunction =>
  (app) => {
    if (legacy)
      convertOptions(options as CopyCodeOptions & Record<string, unknown>);

    if (app.env.isDebug) logger.info("Options:", options);

    useSassPalettePlugin(app, { id: "hope" });

    const userCopyCodeLocales = getLocaleConfig({
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
        addViteSsrNoExternal(bundlerOptions, app, [
          "@vuepress/helper",
          "vuepress-shared",
        ]);
      },

      clientConfigFile: `${CLIENT_FOLDER}config.js`,
    };
  };

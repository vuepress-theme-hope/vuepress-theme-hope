import type { PluginFunction } from "@vuepress/core";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import {
  addViteOptimizeDepsExclude,
  addViteSsrNoExternal,
  checkVersion,
  entries,
  fromEntries,
  getLocales,
} from "vuepress-shared/node";

import { convertOptions } from "./compact.js";
import { photoSwipeLocales } from "./locales.js";
import type { PhotoSwipeOptions } from "./options.js";
import { CLIENT_FOLDER, PLUGIN_NAME, logger } from "./utils.js";

export const photoSwipePlugin =
  (options: PhotoSwipeOptions = {}, legacy = true): PluginFunction =>
  (app) => {
    if (legacy) convertOptions(options as Record<string, unknown>);
    checkVersion(app, PLUGIN_NAME, "2.0.0-rc.0");

    if (app.env.isDebug) logger.info("Options:", options);

    useSassPalettePlugin(app, { id: "hope" });

    return {
      name: PLUGIN_NAME,

      define: (app): Record<string, unknown> => ({
        PHOTO_SWIPE_SELECTOR:
          options.selector ||
          ".theme-default-content :not(a) > img:not([no-view])",
        PHOTO_SWIPE_DELAY: options.delay || 800,
        PHOTO_SWIPE_SCROLL_TO_CLOSE: options.scrollToClose ?? true,
        PHOTO_SWIPE_LOCALES: fromEntries(
          entries(
            getLocales({
              app,
              name: PLUGIN_NAME,
              default: photoSwipeLocales,
              config: options.locales,
            }),
          ).map(([localePath, localeOptions]) => [
            localePath,
            fromEntries(
              entries(localeOptions).map(([key, value]) => [
                `${key}Title`,
                value,
              ]),
            ),
          ]),
        ),
      }),

      extendsBundlerOptions: (bundlerOptions: unknown, app): void => {
        addViteOptimizeDepsExclude(bundlerOptions, app, "photoswipe");
        addViteSsrNoExternal(bundlerOptions, app, "vuepress-shared");
      },

      clientConfigFile: `${CLIENT_FOLDER}config.js`,
    };
  };

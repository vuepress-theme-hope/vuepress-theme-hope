import { type PluginFunction } from "@vuepress/core";
import { getDirname, path } from "@vuepress/utils";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import {
  addViteOptimizeDepsExclude,
  checkVersion,
  entries,
  fromEntries,
  getLocales,
} from "vuepress-shared/node";

import { photoSwipeLocales } from "./locales.js";
import { type PhotoSwipeOptions } from "./options.js";
import { PLUGIN_NAME, logger } from "./utils.js";

const __dirname = getDirname(import.meta.url);

export const photoSwipePlugin =
  (options: PhotoSwipeOptions = {}): PluginFunction =>
  (app) => {
    checkVersion(app, PLUGIN_NAME, "2.0.0-beta.61");

    if (app.env.isDebug) logger.info("Options:", options);

    useSassPalettePlugin(app, { id: "hope" });

    return {
      name: PLUGIN_NAME,

      define: (app): Record<string, unknown> => ({
        PHOTO_SWIPE_SELECTOR:
          options.selector ||
          ".theme-default-content :not(a) > img:not([no-view])",
        PHOTO_SWIPE_DELAY: options.delay || 800,
        PHOTO_SWIPE_LOCALES: fromEntries(
          entries(
            getLocales({
              app,
              name: PLUGIN_NAME,
              default: photoSwipeLocales,
              config: options.locales,
            })
          ).map(([localePath, localeOptions]) => [
            localePath,
            fromEntries(
              entries(localeOptions).map(([key, value]) => [
                `${key}Title`,
                value,
              ])
            ),
          ])
        ),
        PHOTO_SWIPE_OPTIONS: options.options || {},
      }),

      extendsBundlerOptions: (bundlerOptions: unknown, app): void => {
        addViteOptimizeDepsExclude(bundlerOptions, app, "photoswipe");
      },

      clientConfigFile: path.resolve(__dirname, "../client/config.js"),
    };
  };

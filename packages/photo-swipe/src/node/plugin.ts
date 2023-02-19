import { type PluginFunction } from "@vuepress/core";
import { getDirname, path } from "@vuepress/utils";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import {
  addViteOptimizeDepsExclude,
  entries,
  fromEntries,
  getLocales,
} from "vuepress-shared/node";

import { photoSwipeLocales } from "./locales.js";
import { type PhotoSwipeOptions } from "./options.js";
import { logger } from "./utils.js";

const __dirname = getDirname(import.meta.url);

export const photoSwipePlugin =
  (options: PhotoSwipeOptions = {}): PluginFunction =>
  (app) => {
    if (app.env.isDebug) logger.info("Options:", options);

    useSassPalettePlugin(app, { id: "hope" });

    return {
      name: "vuepress-plugin-photo-swipe",

      define: (app): Record<string, unknown> => ({
        PHOTO_SWIPE_SELECTOR:
          options.selector ||
          ".theme-default-content :not(a) > img:not(no-view)",
        PHOTO_SWIPE_DELAY: options.delay || 800,
        PHOTO_SWIPE_LOCALES: fromEntries(
          entries(
            getLocales({
              app,
              name: "photo-swipe",
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

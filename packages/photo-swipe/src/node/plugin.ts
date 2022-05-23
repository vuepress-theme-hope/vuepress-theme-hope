import { path } from "@vuepress/utils";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import { getLocales } from "vuepress-shared";

import { photoSwipeLocales } from "./locales";
import { logger } from "./utils";

import type { PluginFunction } from "@vuepress/core";
import type { PhotoSwipeOptions } from "../shared";

export const photoSwipePlugin =
  (options: PhotoSwipeOptions = {}): PluginFunction =>
  (app) => {
    if (app.env.isDebug) logger.info(`Options: ${options.toString()}`);

    useSassPalettePlugin(app, { id: "hope" });

    return {
      name: "vuepress-plugin-photo-swipe",

      define: (app): Record<string, unknown> => ({
        PHOTO_SWIPE_SELECTOR:
          options.selector || ".theme-default-content :not(a) > img",
        PHOTO_SWIPE_DELAY: options.delay || 500,
        PHOTO_SWIPE_LOCALES: Object.fromEntries(
          Object.entries(
            getLocales({
              app,
              name: "photo-swipe",
              default: photoSwipeLocales,
              config: options.locales,
            })
          ).map(([localePath, localeOptions]) => [
            localePath,
            Object.fromEntries(
              Object.entries(localeOptions).map(([key, value]) => [
                `${key}Title`,
                value,
              ])
            ),
          ])
        ),
        PHOTO_SWIPE_OPTIONS: options.options || {},
      }),

      clientConfigFile: path.resolve(__dirname, "../client/config.js"),
    };
  };

import {
  addViteOptimizeDepsInclude,
  addViteSsrNoExternal,
  getLocales,
  addViteOptimizeDepsExclude,
} from "@mr-hope/vuepress-shared";
import { path } from "@vuepress/utils";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import { photoSwipeLocales } from "./locales";

import type { Plugin, PluginConfig } from "@vuepress/core";
import type { PhotoSwipeOptions } from "../shared";

export const photoSwipePlugin: Plugin<PhotoSwipeOptions> = (options, app) => {
  useSassPalettePlugin(app, { id: "hope" });

  return {
    name: "vuepress-plugin-photo-swipe",

    define: (): Record<string, unknown> => ({
      PHOTO_SWIPE_SELECTOR:
        options.selector || ".theme-default-content :not(a) > img",
      PHOTO_SWIPE_DELAY: options.delay || 500,
      PHOTO_SWIPE_LOCALES: getLocales(app, photoSwipeLocales, options.locales),
      PHOTO_SWIPE_OPTIONS: options.options || {},
    }),

    onInitialized: (app): void => {
      addViteOptimizeDepsInclude(app, [
        "photoswipe",
        "photoswipe/dist/photoswipe-ui-default",
      ]);

      addViteSsrNoExternal(app, [
        "@mr-hope/vuepress-shared",
        "vuepress-plugin-photo-swipe",
      ]);
      addViteOptimizeDepsExclude(app, "vuepress-plugin-photo-swipe");
    },

    clientAppRootComponentFiles: path.resolve(
      __dirname,
      "../client/root-components/ImageViewer.js"
    ),
  };
};

export const photoSwipe = (
  options: PhotoSwipeOptions | false
): PluginConfig<PhotoSwipeOptions> => ["photo-swipe", options];

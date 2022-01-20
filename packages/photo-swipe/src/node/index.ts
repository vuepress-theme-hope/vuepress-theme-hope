import { path } from "@vuepress/utils";
import { getLocales } from "@mr-hope/vuepress-shared";
import { usePalettePlugin } from "vuepress-plugin-sass-palette";
import { photoSwipeLocales } from "./locales";

import type { Plugin } from "@vuepress/core";
import type { PhotoSwipeOptions } from "../shared";

export type { PhotoSwipeOptions } from "../shared";

const photoSwipePlugin: Plugin<PhotoSwipeOptions> = (options, app) => {
  const photoSwipeOptions =
    Object.keys(options).length > 0
      ? options
      : (app.options.themeConfig.photoSwipe as PhotoSwipeOptions) || {};

  usePalettePlugin(app, { id: "hope" });

  return {
    name: "vuepress-plugin-photo-swipe",

    define: (): Record<string, unknown> => ({
      PHOTO_SWIPE_SELECTOR:
        photoSwipeOptions.selector || ".theme-default-content :not(a) > img",
      PHOTO_SWIPE_DELAY: photoSwipeOptions.delay || 500,
      PHOTO_SWIPE_LOCALES: getLocales(
        app,
        photoSwipeLocales,
        photoSwipeOptions.locales
      ),
      PHOTO_SWIPE_OPTIONS: photoSwipeOptions.options || {},
    }),

    clientAppRootComponentFiles: path.resolve(
      __dirname,
      "../client/root-components/ImageViewer.js"
    ),
  };
};

export default photoSwipePlugin;

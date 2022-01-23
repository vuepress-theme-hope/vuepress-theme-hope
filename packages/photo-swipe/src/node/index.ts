import { path } from "@vuepress/utils";
import { getLocales } from "@mr-hope/vuepress-shared";
import { usePalettePlugin } from "vuepress-plugin-sass-palette";
import { photoSwipeLocales } from "./locales";

import type { Plugin } from "@vuepress/core";
import type { PhotoSwipeOptions } from "../shared";

export type { PhotoSwipeOptions } from "../shared";

const photoSwipePlugin: Plugin<PhotoSwipeOptions> = (options, app) => {
  usePalettePlugin(app, { id: "hope" });

  return {
    name: "vuepress-plugin-photo-swipe",

    define: (): Record<string, unknown> => ({
      PHOTO_SWIPE_SELECTOR:
        options.selector || ".theme-default-content :not(a) > img",
      PHOTO_SWIPE_DELAY: options.delay || 500,
      PHOTO_SWIPE_LOCALES: getLocales(app, photoSwipeLocales, options.locales),
      PHOTO_SWIPE_OPTIONS: options.options || {},
    }),

    clientAppRootComponentFiles: path.resolve(
      __dirname,
      "../client/root-components/ImageViewer.js"
    ),
  };
};

export default photoSwipePlugin;

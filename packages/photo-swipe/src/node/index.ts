import { path } from "@vuepress/utils";
import { getLocales } from "@mr-hope/vuepress-shared";
import { usePalettePlugin } from "vuepress-plugin-sass-palette";
import { i18n } from "./i18n";

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
      IMAGE_SELECTOR:
        photoSwipeOptions.selector || ".theme-default-content :not(a) > img",
      PHOTOSWIPE_DELAY: photoSwipeOptions.delay || 500,
      PHOTOSWIPE_OPTIONS: photoSwipeOptions.options || {},
      PHOTOSWIPE_I18N: getLocales(app, i18n, photoSwipeOptions.locale),
    }),

    clientAppRootComponentFiles: path.resolve(
      __dirname,
      "../client/root-components/PhotoSwipe.js"
    ),
  };
};

export default photoSwipePlugin;

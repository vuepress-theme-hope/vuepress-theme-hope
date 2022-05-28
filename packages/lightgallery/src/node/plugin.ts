import { path } from "@vuepress/utils";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import { addViteOptimizeDepsInclude } from "vuepress-shared";

import { logger } from "./utils";

import type { PluginFunction } from "@vuepress/core";
import type { LightGalleryOptions } from "../shared";

export const lightgalleryPlugin =
  (options: LightGalleryOptions = {}): PluginFunction =>
  (app) => {
    if (app.env.isDebug) logger.info(`Options: ${options.toString()}`);

    const plugins = options.plugins || ["pager", "share", "zoom"];

    useSassPalettePlugin(app, { id: "hope" });

    return {
      name: "vuepress-plugin-lightgallery",

      define: (): Record<string, unknown> => ({
        IMAGE_SELECTOR:
          options.selector || ".theme-default-content :not(a) > img",
        LIGHT_GALLERY_DELAY: options.delay || 500,
        LIGHT_GALLERY_OPTIONS: options.options || {},
        LIGHT_GALLERY_AUTOPLAY: plugins.includes("autoplay"),
        LIGHT_GALLERY_FULLSCREEN: plugins.includes("fullscreen"),
        LIGHT_GALLERY_PAGER: plugins.includes("pager"),
        LIGHT_GALLERY_THUMBNAIL: plugins.includes("thumbnail"),
        LIGHT_GALLERY_ROTATE: plugins.includes("rotate"),
        LIGHT_GALLERY_SHARE: plugins.includes("share"),
        LIGHT_GALLERY_ZOOM: plugins.includes("zoom"),
      }),

      extendsBundlerOptions: (config: unknown, app): void => {
        addViteOptimizeDepsInclude({ app, config }, [
          "lightgallery",
          ...plugins.map((name) => `lightgallery/plugins/${name}`),
        ]);
      },

      clientConfigFile: path.resolve(__dirname, "../client/config.js"),
    };
  };

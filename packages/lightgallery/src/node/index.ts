import { path } from "@vuepress/utils";
import { usePalettePlugin } from "vuepress-plugin-sass-palette";

import type { Plugin } from "@vuepress/core";
import type { LightGalleryOptions } from "../shared";

export * from "../shared";

const lightGalleryPlugin: Plugin<LightGalleryOptions> = (options, app) => {
  const plugins = options.plugins || ["pager", "share", "zoom"];

  usePalettePlugin(app, { id: "hope" });

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

    clientAppRootComponentFiles: path.resolve(
      __dirname,
      "../client/root-components/LightGallery.js"
    ),
  };
};

export default lightGalleryPlugin;

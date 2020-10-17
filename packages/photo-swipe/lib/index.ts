import { PhotoSwipeOptions } from "../types";
import { Context, PluginOptionAPI } from "@mr-hope/vuepress-types";
import { resolve } from "path";

export = (
  options: PhotoSwipeOptions,
  { themeConfig }: Context
): PluginOptionAPI => {
  const option =
    Object.keys(options).length > 0 ? options : themeConfig.photoSwipe || {};

  return {
    name: "photo-swipe",

    define: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      IMAGE_CONTAINER: option.container || ".theme-default-content",
      // eslint-disable-next-line @typescript-eslint/naming-convention
      IMAGE_SELECTOR: option.selector || ".theme-default-content :not(a) > img",
      // eslint-disable-next-line @typescript-eslint/naming-convention
      PHOTOSWIPE_OPTIONS: option.option || {},
    },

    enhanceAppFiles: resolve(__dirname, "../src/enhanceAppFile.js"),

    globalUIComponents: "PhotoSwipeUI",
  };
};

import { PhotoSwipeOptions } from "../types";
import { PluginOptionAPI } from "@mr-hope/vuepress-types";
import { resolve } from "path";

export = (options: PhotoSwipeOptions): PluginOptionAPI => ({
  name: "photo-swipe",

  define: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    IMAGE_SELECTOR: options.selector || ".theme-default-content :not(a) > img",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    PHOTOSWIPE_OPTIONS: options.option || {},
  },

  enhanceAppFiles: resolve(__dirname, "enhanceAppFile.ts"),

  plugins: [
    /** typescript 支持 */
    ["typescript"],
  ],

  globalUIComponents: "PhotoSwipeUI",
});

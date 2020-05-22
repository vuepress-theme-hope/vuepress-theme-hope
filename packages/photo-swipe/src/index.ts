import { PluginOptionAPI } from "vuepress-types";
import { resolve } from "path";

export = (options: any): PluginOptionAPI => ({
  name: "photo-swipe",

  define: {
    IMAGE_SELECTOR: options.selector || ".theme-default-content :not(a) > img",
    PHOTOSWIPE_OPTIONS: options.options || {},
  },

  enhanceAppFiles: resolve(__dirname, "enhanceAppFile.ts"),

  plugins: [
    /** typescript 支持 */
    ["typescript"],
  ],

  globalUIComponents: "PhotoSwipeUI",
});

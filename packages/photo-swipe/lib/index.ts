import { PhotoSwipeOptions } from "../types";
import { PluginOptionAPI } from "@mr-hope/vuepress-types";
import { resolve } from "path";

export = ({
  container = ".theme-default-content",
  selector = ".theme-default-content :not(a) > img",
  option = {},
}: PhotoSwipeOptions): PluginOptionAPI => ({
  name: "photo-swipe",

  define: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    IMAGE_CONTAINER: container,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    IMAGE_SELECTOR: selector,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    PHOTOSWIPE_OPTIONS: option,
  },

  enhanceAppFiles: resolve(__dirname, "../src/enhanceAppFile.js"),

  globalUIComponents: "PhotoSwipeUI",
});

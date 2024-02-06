import { config } from "docs-shared";
import { lightgalleryPlugin } from "vuepress-plugin-lightgallery";

import theme from "./theme.js";

// The config wrapper is located in <root>/docs-shared/src/config-wrapper.ts
export default config("lightgallery", {
  locales: {
    "/": {
      lang: "en-US",
      title: "LightGallery plugin",
      description: "LightGallery plugin for VuePress2",
    },

    "/zh/": {
      lang: "zh-CN",
      title: "LightGallery 插件",
      description: "VuePress2 的 LightGallery 插件",
    },
  },

  theme,

  plugins: [
    lightgalleryPlugin({
      selector: ".theme-hope-content :not(a) > img:not([no-view])",
    }),
  ],
});

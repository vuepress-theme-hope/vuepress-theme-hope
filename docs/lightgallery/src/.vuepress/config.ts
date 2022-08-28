import { config } from "docs-shared";
import { lightgalleryPlugin } from "vuepress-plugin-lightgallery";
import theme from "./theme.js";

export default config(
  {
    base: `lightgallery`,
    indexName: "vuepress-theme-hope-lightgallery",
  },
  {
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
      lightgalleryPlugin({ selector: ".theme-hope-content :not(a) > img" }),
    ],
  }
);

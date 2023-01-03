import { config } from "docs-shared";
import theme from "./theme.js";

export default config(
  {
    name: "photo-swipe",
  },
  {
    locales: {
      "/": {
        lang: "en-US",
        title: "Photo preview",
        description: "Photo swipe Plugin for VuePress2",
      },

      "/zh/": {
        lang: "zh-CN",
        title: "图片预览",
        description: "VuePress 的图片预览插件",
      },
    },

    theme,
  }
);

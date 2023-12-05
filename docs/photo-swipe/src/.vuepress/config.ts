import { config } from "docs-shared";
import theme from "./theme.js";

// the config wrapper is located in <root>/docs-shared/src/config-wrapper.ts
export default config(
  { name: "photo-swipe" },
  {
    locales: {
      "/": {
        lang: "en-US",
        title: "Image viewer",
        description: "Image viewer plugin powered by photo-swipe",
      },

      "/zh/": {
        lang: "zh-CN",
        title: "图片浏览",
        description: "由 photo-swipe 驱动的图片浏览插件",
      },
    },

    theme,
  },
);

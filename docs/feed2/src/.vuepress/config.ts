import { config } from "docs-shared";
import theme from "./theme.js";

// the config wrapper is located in <root>/docs-shared/src/config-wrapper.ts
export default config(
  { name: "feed2" },
  {
    locales: {
      "/": {
        lang: "en-US",
        title: "Feed Generator",
        description: "Feed Plugin for VuePress2",
      },

      "/zh/": {
        lang: "zh-CN",
        title: "Feed 生成器",
        description: "VuePress2 Feed 插件",
      },
    },

    theme,
  },
);

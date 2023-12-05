import { config } from "docs-shared";
import theme from "./theme.js";

// the config wrapper is located in <root>/docs-shared/src/config-wrapper.ts
export default config(
  { name: "remove-pwa" },
  {
    locales: {
      "/": {
        lang: "en-US",
        title: "Remove Existing PWA",
        description: "A plugin to remove existing for VuePress2",
      },

      "/zh/": {
        lang: "zh-CN",
        title: "移除 PWA",
        description: "一个移除已存在 PWA 的插件",
      },
    },

    theme,
  },
);

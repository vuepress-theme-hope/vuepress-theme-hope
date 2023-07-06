import { config } from "docs-shared";
import theme from "./theme.js";

// the config wrapper is located in <root>/docs-shared/src/config-wrapper.ts
export default config(
  {
    name: "pwa2",
    pwa: true,
  },
  {
    locales: {
      "/": {
        lang: "en-US",
        title: "PWA Support",
        description: "A powerful PWA plugin for VuePress2",
      },

      "/zh/": {
        lang: "zh-CN",
        title: "PWA 支持",
        description: "一个强大的 PWA 插件",
      },
    },

    theme,
  },
);

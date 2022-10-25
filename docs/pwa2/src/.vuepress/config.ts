import { config } from "docs-shared";
import theme from "./theme.js";

export default config(
  {
    base: `pwa`,
    indexName: "vuepress-theme-hope-pwa2",
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
  }
);

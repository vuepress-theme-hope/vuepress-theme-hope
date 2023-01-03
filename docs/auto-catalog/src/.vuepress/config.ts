import { config } from "docs-shared";
import theme from "./theme.js";

export default config(
  {
    name: "auto-catalog",
  },
  {
    locales: {
      "/": {
        lang: "en-US",
        title: "Auto catalog plugin",
        description: "Plugins for automatically catalog generation",
      },

      "/zh/": {
        lang: "zh-CN",
        title: "自动目录插件",
        description: "VuePress2 的自动生成目录插件",
      },
    },

    theme,
  }
);

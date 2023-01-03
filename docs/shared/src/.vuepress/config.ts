import { config } from "docs-shared";
import theme from "./theme.js";

export default config(
  {
    name: "shared",
  },
  {
    locales: {
      "/": {
        lang: "en-US",
        title: "VuePress shared",
        description: "Some powerful utils for VuePress2",
      },

      "/zh/": {
        lang: "zh-CN",
        title: "VuePress shared",
        description: "VuePress2 的强大工具函数",
      },
    },

    theme,
  }
);

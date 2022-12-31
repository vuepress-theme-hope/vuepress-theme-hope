import { config } from "docs-shared";
import theme from "./theme.js";

export default config(
  {
    base: "components",
    indexName: "vuepress-theme-hope-components",
  },
  {
    locales: {
      "/": {
        lang: "en-US",
        title: "Components Lib",
        description: "Useful components for VuePress2",
      },
      "/zh/": {
        lang: "zh-CN",
        title: "组件库",
        description: "面向 VuePress2 的常用组件",
      },
    },

    theme,
  }
);

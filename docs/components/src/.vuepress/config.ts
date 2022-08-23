import { config } from "docs-shared";
import theme from "./theme";

export default config(
  {
    base: `components`,
    indexName: "vuepress-theme-hope-components",
  },
  {
    locales: {
      "/": {
        lang: "en-US",
        title: "Components Lib",
        description: "Components Lib plugin for VuePress",
      },
      "/zh/": {
        lang: "zh-CN",
        title: "组件库",
        description: "VuePress 的组件库插件",
      },
    },

    theme,
  }
);

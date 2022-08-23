import { config } from "docs-shared";
import theme from "./theme";

export default config(
  {
    base: `feed`,
    indexName: "vuepress-theme-hope-feed2",
  },
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
        description: "VuePress Feed 插件",
      },
    },

    theme,
  }
);

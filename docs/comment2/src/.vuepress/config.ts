import { config } from "docs-shared";
import theme from "./theme.js";

export default config(
  {
    base: "comment",
    indexName: "vuepress-theme-hope-comment2",
  },
  {
    locales: {
      "/": {
        lang: "en-US",
        title: "Comment Plugin",
        description: "Comment Plugin for VuePress",
      },

      "/zh/": {
        lang: "zh-CN",
        title: "评论插件",
        description: "VuePress 的评论插件",
      },
    },

    theme,
  }
);

import { config } from "docs-shared";
import theme from "./theme.js";

export default config(
  {
    base: `search-pro`,
    indexName: "vuepress-theme-hope-search-pro",
  },
  {
    locales: {
      "/": {
        lang: "en-US",
        title: "Search Pro Plugin",
        description: "Full text search plugin at client",
      },
      "/zh/": {
        lang: "zh-CN",
        title: "增强搜索插件",
        description: "在客户端进行全文搜索",
      },
    },

    theme,
  }
);

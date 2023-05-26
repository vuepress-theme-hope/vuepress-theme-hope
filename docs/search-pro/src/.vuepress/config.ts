import { config } from "docs-shared";
import { searchProPlugin } from "vuepress-plugin-search-pro";
import { cut } from "nodejs-jieba";
import theme from "./theme.js";

export default config(
  {
    name: "search-pro",
    indexName: false,
  },
  {
    locales: {
      "/": {
        lang: "en-US",
        title: "Search Pro Plugin",
        description: "Powerful client search plugin",
      },
      "/zh/": {
        lang: "zh-CN",
        title: "增强搜索插件",
        description: "强大的客户端搜索插件",
      },
    },
    plugins: [
      searchProPlugin({
        indexContent: true,
        indexLocaleOptions: {
          "/zh/": {
            tokenize: (text, fieldName) =>
              fieldName === "id" ? [text] : cut(text, true),
          },
        },
      }),
    ],

    theme,
  }
);

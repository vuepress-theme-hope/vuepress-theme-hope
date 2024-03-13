import { config } from "docs-shared";
import { path } from "vuepress/utils";

import theme from "./theme.js";

// The config wrapper is located in <root>/docs-shared/src/config-wrapper.ts
export default config("search-pro", {
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

  theme,

  clientConfigFile: path.resolve(__dirname, "./client.ts"),
});

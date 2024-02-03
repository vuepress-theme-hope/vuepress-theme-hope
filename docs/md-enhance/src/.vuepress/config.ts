import { config } from "docs-shared";
import { getDirname, path } from "vuepress/utils";

import theme from "./theme.js";

const __dirname = getDirname(import.meta.url);

// The config wrapper is located in <root>/docs-shared/src/config-wrapper.ts
export default config("md-enhance", {
  locales: {
    "/": {
      lang: "en-US",
      title: "Markdown Enhance",
      description: "Markdown Enhancement for VuePress2",
    },

    "/zh/": {
      lang: "zh-CN",
      title: "Markdown 增强",
      description: "VuePress 的 Markdown 增强插件",
    },
  },

  theme,

  pagePatterns: ["**/*.md", "!**/*.snippet.md", "!.vuepress", "!node_modules"],

  alias: {
    "@FlowChartPlayground": path.resolve(
      __dirname,
      "./components/FlowChartPlayground.js",
    ),
    "@KatexPlayground": path.resolve(
      __dirname,
      "./components/KatexPlayground.js",
    ),
  },

  clientConfigFile: path.resolve(__dirname, "./client.ts"),
});

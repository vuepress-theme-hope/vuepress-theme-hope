import { path } from "@vuepress/utils";
import { config } from "docs-shared";
import theme from "./theme";

const base = <"/" | `/${string}/`>process.env.BASE || "/";

export default config({
  base: `${base}md-enhance/`,

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
    "@KatexPlayground": path.resolve(__dirname, "./components/KatexPlayground"),
  },
});

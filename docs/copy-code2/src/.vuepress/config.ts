import { config } from "docs-shared";
import theme from "./theme.js";

export default config(
  {
    name: "copy-code2",
  },
  {
    locales: {
      "/": {
        lang: "en-US",
        title: "Copy Code Block",
        description: "Quick Code Copy Plugin for vuepress",
      },

      "/zh/": {
        lang: "zh-CN",
        title: "复制代码块",
        description: "VuePress 的代码一键复制插件",
      },
    },

    theme,
  }
);

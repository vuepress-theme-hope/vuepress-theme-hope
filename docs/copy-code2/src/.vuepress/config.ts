import { config } from "docs-shared";
import theme from "./theme.js";

// the config wrapper is located in <root>/docs-shared/src/config-wrapper.ts
export default config(
  { name: "copy-code2" },
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
  },
);

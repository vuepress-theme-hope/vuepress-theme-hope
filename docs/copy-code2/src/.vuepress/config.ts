import { config } from "docs-shared";
import theme from "./theme.js";

// the config wrapper is located in <root>/docs-shared/src/config-wrapper.ts
export default config("copy-code2", {
  locales: {
    "/": {
      lang: "en-US",
      title: "Code Copy button",
      description: "VuePress2 Plugin providing copy button for code fences",
    },

    "/zh/": {
      lang: "zh-CN",
      title: "代码块复制按钮",
      description: "为代码块提供复制按钮的 VuePress2 插件",
    },
  },

  theme,
});

import { config } from "docs-shared";

import theme from "./theme.js";

// The config wrapper is located in <root>/docs-shared/src/config-wrapper.ts
export default config("shared", {
  locales: {
    "/": {
      lang: "en-US",
      title: "VuePress shared",
      description: "Some powerful utils for VuePress2",
    },

    "/zh/": {
      lang: "zh-CN",
      title: "VuePress shared",
      description: "VuePress2 的强大工具函数",
    },
  },

  theme,
});

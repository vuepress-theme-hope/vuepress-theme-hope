import { config } from "docs-shared";

import theme from "./theme.js";

// The config wrapper is located in <root>/docs-shared/src/config-wrapper.ts
export default config("comment2", {
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
});

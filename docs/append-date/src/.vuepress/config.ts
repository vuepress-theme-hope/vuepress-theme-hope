import { config } from "docs-shared";

import theme from "./theme.js";

// The config wrapper is located in <root>/docs-shared/src/config-wrapper.ts
export default config("append-date", {
  locales: {
    "/": {
      lang: "en-US",
      title: "Append date",
      description: "VuePress2 plugin which appends date from git commit.",
    },

    "/zh/": {
      lang: "zh-CN",
      title: "自动追加日期",
      description: "自动从 git commit 追加日期的 VuePress2 插件",
    },
  },

  theme,
});

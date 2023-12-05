import { config } from "docs-shared";
import theme from "./theme.js";

// the config wrapper is located in <root>/docs-shared/src/config-wrapper.ts
export default config(
  { name: "append-date" },
  {
    locales: {
      "/": {
        lang: "en-US",
        title: "Append date plugin",
        description:
          "Plugins for automatically appending date from git commit.",
      },

      "/zh/": {
        lang: "zh-CN",
        title: "自动追加日期插件",
        description: "自动从 git commit 追加日期的插件。",
      },
    },

    theme,
  },
);

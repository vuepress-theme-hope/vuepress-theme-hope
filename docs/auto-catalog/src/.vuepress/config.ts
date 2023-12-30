import { config } from "docs-shared";
import theme from "./theme.js";

// the config wrapper is located in <root>/docs-shared/src/config-wrapper.ts
export default config("auto-catalog", {
  locales: {
    "/": {
      lang: "en-US",
      title: "Auto catalog plugin",
      description: "Plugins generating and displaying catalog for VuePress2",
    },

    "/zh/": {
      lang: "zh-CN",
      title: "自动目录插件",
      description: "生成和展示目录的 VuePress2 插件",
    },
  },

  theme,
});

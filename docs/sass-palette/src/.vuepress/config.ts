import { config } from "docs-shared";
import theme from "./theme.js";

// the config wrapper is located in <root>/docs-shared/src/config-wrapper.ts
export default config(
  { name: "sass-palette" },
  {
    locales: {
      "/": {
        lang: "en-US",
        title: "Sass Palette",
        description: "Sass Palette Plugin for VuePress2",
      },

      "/zh/": {
        lang: "zh-CN",
        title: "Sass 调色板",
        description: "VuePress2 的 Sass 调色板插件",
      },
    },

    theme,
  },
);

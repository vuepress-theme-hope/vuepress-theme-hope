import { config } from "docs-shared";
import theme from "./theme.js";

export default config(
  {
    name: "sass-palette",
  },
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
  }
);

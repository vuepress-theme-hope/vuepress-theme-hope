import { config, pwaHead } from "docs-shared";
import { getDirname, path } from "vuepress/utils";

import theme from "./theme.js";

const __dirname = getDirname(import.meta.url);

// The config wrapper is located in <root>/docs-shared/src/config-wrapper.ts
export default config("", {
  head: [
    ...pwaHead,
    [
      "meta",
      {
        name: "google-site-verification",
        content: "qG3soux9jAKB4Q_DYf7yj1p5cEIuib6yG4zDhpmv2_E",
      },
    ],
  ],

  locales: {
    "/": {
      lang: "en-US",
      title: "vuepress-theme-hope",
      description: "A VuePress theme with tons of features✨",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "vuepress-theme-hope",
      description: "一个具有强大功能的 vuepress 主题✨",
    },
  },

  theme,

  pagePatterns: ["**/*.md", "!**/*.snippet.md", "!.vuepress", "!node_modules"],

  alias: {
    "@FlowChartPlayground": path.resolve(
      __dirname,
      "../../../md-enhance/src/.vuepress/components/FlowChartPlayground.js",
    ),
    "@IconDisplay": path.resolve(
      __dirname,
      "../../../components/src/.vuepress/components/IconDisplay.js",
    ),
    "@KatexPlayground": path.resolve(
      __dirname,
      "../../../md-enhance/src/.vuepress/components/KatexPlayground.js",
    ),
    "@ToggleRTLButton": path.resolve(
      __dirname,
      "./components/ToggleRTLButton.js",
    ),
  },

  clientConfigFile: path.resolve(__dirname, "./client.ts"),
});

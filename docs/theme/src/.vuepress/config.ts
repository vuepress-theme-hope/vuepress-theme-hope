import { config, getDirname, path } from "docs-shared";
import theme from "./theme.js";

const __dirname = getDirname(import.meta.url);

export default config(
  {
    name: "hope",
    base: "",
    indexName: "theme-v2",
  },
  {
    head: [
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

    pagePatterns: [
      "**/*.md",
      "!**/*.snippet.md",
      "!.vuepress",
      "!node_modules",
    ],

    alias: {
      "@FlowChartPlayground": path.resolve(
        __dirname,
        "./components/FlowChartPlayground"
      ),
      "@IconDisplay": path.resolve(__dirname, "./components/IconDisplay"),
      "@KatexPlayground": path.resolve(
        __dirname,
        "./components/KatexPlayground"
      ),
      "@ToggleRTLButton": path.resolve(
        __dirname,
        "./components/ToggleRTLButton"
      ),
    },

    clientConfigFile: path.resolve(__dirname, "./client.ts"),
  }
);

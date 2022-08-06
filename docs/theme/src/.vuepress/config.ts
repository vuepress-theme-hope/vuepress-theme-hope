import { path } from "@vuepress/utils";
import { config } from "docs-shared";
import theme from "./theme";

const base = <"/" | `/${string}/`>process.env.BASE || "/";

export default config({
  base,

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
      description: "A vuepress theme with tons of features✨",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "vuepress-theme-hope",
      description: "一个具有强大功能的 vuepress 主题✨",
    },
    "/ru/": {
      lang: "ru-RU",
      title: "vuepress-theme-hope",
      description: "Тема vuepress с множеством функций✨",
    },
  },

  theme,

  pagePatterns: ["**/*.md", "!**/*.snippet.md", "!.vuepress", "!node_modules"],

  alias: {
    "@IconDisplay": path.resolve(__dirname, "./components/IconDisplay"),
    "@KatexPlayground": path.resolve(__dirname, "./components/KatexPlayground"),
  },

  define: () => ({
    IS_NETLIFY: "NETLIFY" in process.env,
  }),
});

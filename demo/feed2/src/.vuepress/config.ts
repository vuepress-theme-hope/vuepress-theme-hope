import { defineUserConfig } from "@vuepress/cli";
import { defaultTheme } from "@vuepress/theme-default";
import { feedPlugin } from "vuepress-plugin-feed2";

const base = <"/" | `/${string}/`>process.env["BASE"] || "/";

export default defineUserConfig({
  base,

  locales: {
    "/": {
      title: "Feed",
      description: "VuePress2 Feed Plugin",
      lang: "en-US",
    },
    "/zh/": {
      title: "Feed",
      description: "VuePress2 Feed 插件",
      lang: "zh-CN",
    },
  },

  theme: defaultTheme({
    logo: "/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope/tree/main/demo/feed2/",

    locales: {
      "/": {
        navbar: ["/", "/demo", "/custom", "/exclude"],
      },
      "/zh/": {
        navbar: ["/zh/", "/zh/demo", "/zh/custom", "/zh/exclude"],
        selectLanguageText: "选择语言",
        selectLanguageName: "简体中文",
        lastUpdatedText: "上次编辑于",
      },
    },
  }),

  plugins: [
    feedPlugin({
      hostname: "https://plugin-feed2-demo.vuejs.press",
      atom: true,
      json: true,
      rss: true,
    }),
  ],
});

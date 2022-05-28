import { defineUserConfig } from "@vuepress/cli";
import { defaultTheme } from "@vuepress/theme-default";
import { feedPlugin } from "vuepress-plugin-feed2";

const BASE = process.env.BASE as "/" | `/${string}/`;

export default defineUserConfig({
  base: BASE || "/",

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
        lang: "zh-CN",
        selectText: "选择语言",
        lastUpdatedText: "上次编辑于",
        label: "简体中文",
      },
    },
  }),

  plugins: [
    feedPlugin({
      hostname: "https://vuepress-theme-hope.github.io",
      atom: true,
      rss: true,
      json: true,
    }),
  ],
});

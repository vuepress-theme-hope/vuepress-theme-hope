import { defineUserConfig } from "@vuepress/cli";
import type { DefaultThemeOptions } from "@vuepress/theme-default";

export default defineUserConfig<DefaultThemeOptions>({
  base: process.env.VuePress_BASE || "/",

  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["meta", { name: "author", content: "Mr.Hope" }],
    [
      "meta",
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover",
      },
    ],
  ],

  locales: {
    "/": {
      title: "Feed",
      description: "VuePress Feed",
      lang: "en-US",
    },
    "/zh/": { title: "流", description: "VuePress 流", lang: "zh-CN" },
  },

  themeConfig: {
    logo: "/logo.svg",

    navbar: [{ text: "Home", link: "/" }],

    locales: {
      "/zh/": {
        navbar: [{ text: "主页", link: "/zh/" }],
        lang: "zh-CN",
        selectText: "选择语言",
        lastUpdatedText: "上次编辑于",
        label: "简体中文",
      },
    },
  },

  plugins: [
    [
      "feed2",
      { hostname: "https://example.com", atom: true, rss: true, json: true },
    ],
  ],
});

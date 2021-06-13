import type { UserConfig } from "@vuepress/cli";
import type { DefaultThemeOptions } from "@vuepress/theme-default";

const config: UserConfig<DefaultThemeOptions> = {
  base: process.env.VuePress_BASE || "/",

  title: "Feed",

  description: "VuePress Feed",

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
      lang: "zh-CN",
    },
  },

  themeConfig: {
    logo: "/logo.svg",

    navbar: [{ text: "主页", link: "/" }],

    locales: {
      "/": {
        lang: "zh-CN",
        selectText: "选择语言",
        lastUpdatedText: "上次编辑于",
        label: "简体中文",
      },
    },
  },

  plugins: [["feed2", { hostname: "https://example.com" }]],
};

export default config;

import { defineHopeConfig } from "vuepress-theme-hope";
import themeConfig from "./themeConfig";

const base = process.env.BASE || "/";

export default defineHopeConfig({
  base: `/${base.replace(/^\//, "")}v2-demo/`,

  dest: "./dist",

  head: [
    [
      "link",
      {
        rel: "stylesheet",
        href: "//at.alicdn.com/t/font_2410206_mfj6e1vbwo.css",
      },
    ],
  ],

  locales: {
    "/": {
      lang: "en-US",
      title: "Theme Demo",
      description: "A demo for vuepress-theme-hope",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "主题演示",
      description: "vuepress-theme-hope 的演示",
    },
  },

  themeConfig,
});

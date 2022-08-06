import { defineUserConfig } from "@vuepress/cli";
import theme from "./theme";

const base = <"/" | `/${string}/`>process.env.BASE || "/";

export default defineUserConfig({
  base,

  dest: "./dist",

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

  theme,

  shouldPrefetch: false,
});

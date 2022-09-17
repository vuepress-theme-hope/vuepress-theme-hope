import { defineUserConfig } from "@vuepress/cli";
import theme from "./theme.js";

const base = <"/" | `/${string}/`>process.env.BASE || "/";

export default defineUserConfig({
  base,

  dest: "./dist",

  locales: {
    "/": {
      lang: "en-US",
      title: "Blog Demo",
      description: "A blog demo for vuepress-theme-hope",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "博客演示",
      description: "vuepress-theme-hope 的博客演示",
    },
  },

  theme,

  shouldPrefetch: false,
});

import { viteBundler } from "@vuepress/bundler-vite";
import { webpackBundler } from "@vuepress/bundler-webpack";
import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

const base = (process.env.BASE as "/" | `/${string}/` | undefined) ?? "/";

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

  bundler: process.env.BUNDLER === "webpack" ? webpackBundler() : viteBundler(),

  theme,

  shouldPrefetch: false,
});

// import { DevTools } from "@vitejs/devtools";
import { viteBundler } from "@vuepress/bundler-vite";
import { webpackBundler } from "@vuepress/bundler-webpack";
// import inspect from "vite-plugin-inspect";
import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

const base = (process.env.BASE as "/" | `/${string}/` | undefined) ?? "/";

export default defineUserConfig({
  base,

  dest: "./dist",

  locales: {
    "/": {
      lang: "en-US",
      title: "Docs Demo",
      description: "A docs demo for vuepress-theme-hope",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "文档演示",
      description: "vuepress-theme-hope 的文档演示",
    },
  },

  bundler:
    process.env.BUNDLER === "webpack"
      ? webpackBundler()
      : viteBundler({
          // viteOptions: {
          //   plugins: [
          //     // oxlint-disable-next-line new-cap
          //     DevTools({
          //       build: { withApp: true },
          //       builtinDevTools: false,
          //     }),
          //     inspect(),
          //   ],
          // },
        }),

  theme,

  shouldPrefetch: false,
});

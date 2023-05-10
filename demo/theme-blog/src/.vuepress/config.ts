import { defineUserConfig } from "@vuepress/cli";
import { getDirname, path } from "@vuepress/utils";
import { addViteConfig } from "vuepress-shared";

import theme from "./theme.js";

const __dirname = getDirname(import.meta.url);
const base = <"/" | `/${string}/`>process.env["BASE"] || "/";

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

  alias: {
    "@theme-hope/modules/blog/components/BlogHero": path.resolve(
      __dirname,
      "./components/BlogHero.vue"
    ),
  },

  extendsBundlerOptions: (config, app) => {
    addViteConfig(config, app, {
      build: {
        target: ["es2020", "edge88", "firefox78", "chrome87", "safari14"],
      },
    });
  },
});

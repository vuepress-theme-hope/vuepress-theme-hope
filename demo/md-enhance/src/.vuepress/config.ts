import { viteBundler } from "@vuepress/bundler-vite";
import { webpackBundler } from "@vuepress/bundler-webpack";
import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress";
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

const base = (process.env.BASE as "/" | `/${string}/` | undefined) ?? "/";

export default defineUserConfig({
  base,

  title: "Markdown Enhance Plugin",

  description: "Markdown Enhancement for VuePress",

  bundler: process.env.BUNDLER === "webpack" ? webpackBundler() : viteBundler(),

  theme: defaultTheme({
    logo: "https://theme-hope-assets.vuejs.press/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope/tree/main/demo/md-enhance/",

    navbar: [
      { text: "Home", link: "/" },
      { text: "Demo", link: "/demo/" },
    ],

    sidebar: {
      "/demo/": [
        "/demo/code-demo",
        "/demo/kotlin-playground",
        "/demo/playground",
        "/demo/sandpack",
        "/demo/vue-playground",
      ],
    },
  }),

  plugins: [
    mdEnhancePlugin({
      demo: true,
      kotlinPlayground: true,
      playground: {
        presets: ["ts", "vue", "unocss"],
      },
      sandpack: true,
      vuePlayground: true,
    }),
  ],
});

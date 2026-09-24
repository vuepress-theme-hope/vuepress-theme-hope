import { viteBundler } from "@vuepress/bundler-vite";
import { webpackBundler } from "@vuepress/bundler-webpack";
import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress";
import { componentsPlugin } from "vuepress-plugin-components";

const base = (process.env.BASE as "/" | `/${string}/` | undefined) ?? "/";

export default defineUserConfig({
  base,

  title: "Components Lib",
  description: "Components library for VuePress2",

  bundler: process.env.BUNDLER === "webpack" ? webpackBundler() : viteBundler(),

  theme: defaultTheme({
    logo: "https://theme-hope-assets.vuejs.press/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope/tree/main/demo/components/",

    navbar: ["/", "/demo/"],

    sidebar: [
      "/demo/",
      "/demo/badge",
      "/demo/code-pen",
      "/demo/share",
      "/demo/site-info",
      "/demo/stack-blitz",
      "/demo/vp-banner",
      "/demo/vp-card",
    ],
  }),

  plugins: [
    componentsPlugin({
      components: ["Badge", "CodePen", "Share", "SiteInfo", "StackBlitz", "VPBanner", "VPCard"],
    }),
  ],
});

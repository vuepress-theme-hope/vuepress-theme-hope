import { defineUserConfig } from "@vuepress/cli";
import { defaultTheme } from "@vuepress/theme-default";
import { componentsPlugin } from "vuepress-plugin-components";

const BASE = process.env.BASE as "/" | `/${string}/`;

export default defineUserConfig({
  base: BASE || "/",

  title: "Components Lib",
  description: "Components library for VuePress2",

  theme: defaultTheme({
    logo: "/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope/tree/main/demo/components/",

    navbar: ["/", "/demo/"],

    sidebar: [
      "/demo/",
      "/demo/badge",
      "/demo/codepen",
      "/demo/fonticon",
      "/demo/pdf",
    ],
  }),

  plugins: [
    componentsPlugin({
      addThis: "ra-5f829c59e6c6bc9a",
      components: ["Badge", "CodePen", "FontIcon", "PDF", "StackBlitz"],
      iconAssets: "//at.alicdn.com/t/font_2410206_a0xb9hku9iu.css",
    }),
  ],
});

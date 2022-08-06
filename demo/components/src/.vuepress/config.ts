import { defineUserConfig } from "@vuepress/cli";
import { defaultTheme } from "@vuepress/theme-default";
import { componentsPlugin } from "vuepress-plugin-components";

const base = <"/" | `/${string}/`>process.env.BASE || "/";

export default defineUserConfig({
  base,

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
      "/demo/stackblitz",
      "/demo/youtube",
    ],

    themePlugins: {
      backToTop: false,
    },
  }),

  plugins: [
    componentsPlugin({
      addThis: "ra-5f829c59e6c6bc9a",
      backToTop: true,
      components: [
        "Badge",
        "CodePen",
        "FontIcon",
        "PDF",
        "StackBlitz",
        "YouTube",
      ],
      iconAssets: "iconfont",
    }),
  ],
});

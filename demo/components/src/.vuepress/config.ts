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
      "/demo/audioplayer",
      "/demo/badge",
      "/demo/bilibili",
      "/demo/catalog",
      "/demo/codepen",
      "/demo/fonticon",
      "/demo/pdf",
      "/demo/stackblitz",
      "/demo/videoplayer",
      "/demo/youtube",
    ],

    themePlugins: {
      backToTop: false,
    },
  }),

  plugins: [
    componentsPlugin({
      components: [
        "AudioPlayer",
        "Badge",
        "BiliBili",
        "Catalog",
        "CodePen",
        "FontIcon",
        "PDF",
        "StackBlitz",
        "VideoPlayer",
        "YouTube",
      ],

      componentOptions: {
        fontIcon: {
          assets: "iconfont",
        },
        pdf: {
          pdfjs: "/assets/lib/pdfjs/",
        },
      },

      rootComponents: {
        addThis: "ra-5f829c59e6c6bc9a",
        backToTop: true,
        notice: {
          locales: {
            "/": {
              title: "Notice Title",
              content: "Notice Content",
              actions: [
                {
                  text: "Primary Action",
                  link: "https://vuepress-theme-hope.github.io/",
                  type: "primary",
                },
                { text: "Default Action" },
              ],
            },
          },
          fullscreen: true,
        },
      },
    }),
  ],
});

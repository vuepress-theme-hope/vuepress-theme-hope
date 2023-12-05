import { defineUserConfig } from "@vuepress/cli";
import { defaultTheme } from "@vuepress/theme-default";
import { componentsPlugin } from "vuepress-plugin-components";
import { addViteSsrNoExternal } from "vuepress-shared";

const base = <"/" | `/${string}/`>process.env["BASE"] || "/";

export default defineUserConfig({
  base,

  title: "Components Lib",
  description: "Components library for VuePress2",

  theme: defaultTheme({
    logo: "https://theme-hope-assets.vuejs.press/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope/tree/main/demo/components/",

    navbar: ["/", "/demo/"],

    sidebar: [
      "/demo/",
      "/demo/art-player",
      "/demo/audio-player",
      "/demo/badge",
      "/demo/bili-bili",
      "/demo/code-pen",
      "/demo/font-icon",
      "/demo/pdf",
      "/demo/repl-it",
      "/demo/share",
      "/demo/site-info",
      "/demo/stack-blitz",
      "/demo/vp-banner",
      "/demo/vp-card",
      "/demo/video-player",
      "/demo/vid-stack",
      "/demo/xi-gua",
      "/demo/you-tube",
    ],

    themePlugins: {
      backToTop: false,
    },
  }),

  extendsBundlerOptions: (bundlerOptions, app) => {
    addViteSsrNoExternal(bundlerOptions, app, "artplayer-plugin-danmuku");
  },

  plugins: [
    componentsPlugin({
      components: [
        "ArtPlayer",
        "AudioPlayer",
        "Badge",
        "BiliBili",
        "CodePen",
        "FontIcon",
        "PDF",
        "Replit",
        "Share",
        "SiteInfo",
        "StackBlitz",
        "VPBanner",
        "VPCard",
        "VidStack",
        "VideoPlayer",
        "XiGua",
        "YouTube",
      ],

      componentOptions: {
        fontIcon: {
          assets: "fontawesome",
        },
        pdf: {
          pdfjs: "/assets/lib/pdfjs/",
        },
      },

      rootComponents: {
        backToTop: true,
        notice: [
          {
            match: /^\/$/,
            title: "Notice Title",
            content: "Notice Content",
            actions: [
              {
                text: "Primary Action",
                link: "https://theme-hope.vuejs.press/",
                type: "primary",
              },
              { text: "Default Action" },
            ],
            fullscreen: true,
          },
        ],
      },
    }),
  ],
});

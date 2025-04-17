import { addViteSsrNoExternal } from "@vuepress/helper";
import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress";
import { componentsPlugin } from "vuepress-plugin-components";

const base = (process.env.BASE as "/" | `/${string}/` | undefined) ?? "/";

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
      "/demo/badge",
      "/demo/bili-bili",
      "/demo/code-pen",
      "/demo/pdf",
      "/demo/share",
      "/demo/site-info",
      "/demo/stack-blitz",
      "/demo/vp-banner",
      "/demo/vp-card",
      "/demo/vid-stack",
    ],
  }),

  extendsBundlerOptions: (bundlerOptions, app) => {
    addViteSsrNoExternal(bundlerOptions, app, "artplayer-plugin-danmuku");
  },

  plugins: [
    componentsPlugin({
      components: [
        "ArtPlayer",
        "Badge",
        "BiliBili",
        "CodePen",
        "PDF",
        "Share",
        "SiteInfo",
        "StackBlitz",
        "VPBanner",
        "VPCard",
        "VidStack",
      ],
    }),
  ],
});

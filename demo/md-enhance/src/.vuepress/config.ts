import { defineUserConfig } from "@vuepress/cli";
import { defaultTheme } from "@vuepress/theme-default";
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

const BASE = process.env.BASE as "/" | `/${string}/`;

export default defineUserConfig({
  base: BASE || "/",

  title: "Markdown Enhance Plugin",

  description: "Markdown Enhancement for VuePress",

  theme: defaultTheme({
    logo: "/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope/tree/main/demo/md-enhance/",

    navbar: [
      { text: "Home", link: "/" },
      { text: "Demo", link: "/demo/" },
    ],

    sidebar: {
      "/demo/": [
        "/demo/align",
        "/demo/attrs",
        "/demo/chart",
        "/demo/echarts",
        "/demo/code-demo",
        "/demo/code-tabs",
        "/demo/container",
        "/demo/flowchart",
        "/demo/footnote",
        "/demo/image-mark",
        "/demo/mark",
        "/demo/include",
        "/demo/mermaid",
        "/demo/presentation",
        "/demo/sup-sub",
        "/demo/tabs",
        "/demo/tasklist",
        "/demo/tex",
      ],
    },

    themePlugins: {
      container: {
        tip: false,
        warning: false,
        danger: false,
        details: false,
      },
    },
  }),

  plugins: [
    mdEnhancePlugin({
      enableAll: true,
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
    }),
  ],
});

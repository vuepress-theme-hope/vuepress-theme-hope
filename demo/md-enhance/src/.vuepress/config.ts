import { defineUserConfig } from "@vuepress/cli";
import type { DefaultThemeOptions } from "@vuepress/theme-default";

const BASE = process.env.BASE as "/" | `/${string}/`;

export default defineUserConfig<DefaultThemeOptions>({
  base: BASE || "/",

  title: "Markdown Enhance Plugin",

  description: "Markdown Enhancement for VuePress",

  themeConfig: {
    logo: "/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope/tree/main/demo/md-enhance/",

    navbar: [
      { text: "Home", link: "/" },
      { text: "Demo", link: "/demo/" },
    ],

    sidebar: {
      "/demo/": [
        "/demo/align",
        "/demo/chart",
        "/demo/code-demo",
        "/demo/code-group",
        "/demo/container",
        "/demo/flowchart",
        "/demo/footnote",
        "/demo/image-mark",
        "/demo/mark",
        "/demo/md-import",
        "/demo/mermaid",
        "/demo/presentation",
        "/demo/sup-sub",
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
  },

  plugins: [
    [
      "md-enhance",
      {
        enableAll: true,
        presentation: {
          plugins: ["highlight", "math", "search", "notes", "zoom"],
        },
      },
    ],
  ],
});

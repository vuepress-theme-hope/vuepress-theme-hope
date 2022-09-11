import { defineUserConfig } from "@vuepress/cli";
import { defaultTheme } from "@vuepress/theme-default";
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

const base = <"/" | `/${string}/`>process.env.BASE || "/";

export default defineUserConfig({
  base,

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
        "/demo/playground",
        "/demo/presentation",
        "/demo/sup-sub",
        "/demo/tabs",
        "/demo/tasklist",
        "/demo/tex",
        "/demo/vue-playground",
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
      playground: {
        presets: ["ts", "vue"],
      },
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
    }),
  ],
});

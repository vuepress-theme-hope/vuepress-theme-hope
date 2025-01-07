import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress";
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

const base = (process.env.BASE as "/" | `/${string}/` | undefined) ?? "/";

export default defineUserConfig({
  base,

  title: "Markdown Enhance Plugin",

  description: "Markdown Enhancement for VuePress",

  theme: defaultTheme({
    logo: "https://theme-hope-assets.vuejs.press/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope/tree/main/demo/md-enhance/",

    navbar: [
      { text: "Home", link: "/" },
      { text: "Demo", link: "/demo/" },
    ],

    sidebar: {
      "/demo/": [
        "/demo/chartjs",
        "/demo/echarts",
        "/demo/code-demo",
        "/demo/flowchart",
        "/demo/kotlin-playground",
        "/demo/markmap",
        "/demo/mermaid",
        "/demo/plantuml",
        "/demo/playground",
        "/demo/sandpack",
        "/demo/vue-playground",
      ],
    },
  }),

  plugins: [
    mdEnhancePlugin({
      chartjs: true,
      demo: true,
      echarts: true,
      flowchart: true,
      markmap: true,
      mermaid: true,
      kotlinPlayground: true,
      plantuml: true,
      playground: {
        presets: ["ts", "vue", "unocss"],
      },
      sandpack: true,
      vuePlayground: true,
    }),
  ],
});

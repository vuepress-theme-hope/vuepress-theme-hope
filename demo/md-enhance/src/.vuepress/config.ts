import { defineUserConfig } from "@vuepress/cli";
import { defaultTheme } from "@vuepress/theme-default";
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

const base = <"/" | `/${string}/`>process.env["BASE"] || "/";

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
        "/demo/alert",
        "/demo/align",
        "/demo/attrs",
        "/demo/chart",
        "/demo/echarts",
        "/demo/code-demo",
        "/demo/code-tabs",
        "/demo/component",
        "/demo/figure",
        "/demo/flowchart",
        "/demo/footnote",
        "/demo/hint",
        "/demo/image-mark",
        "/demo/image-size",
        "/demo/include",
        "/demo/kotlin-playground",
        "/demo/mark",
        "/demo/markmap",
        "/demo/mermaid",
        "/demo/playground",
        "/demo/revealjs",
        "/demo/slide-page",
        "/demo/stylized",
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
      alert: true,
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      component: true,
      demo: true,
      echarts: true,
      figure: true,
      flowchart: true,
      gfm: true,
      hint: true,
      imgLazyload: true,
      imgMark: true,
      imgSize: true,
      include: true,
      mark: true,
      markmap: true,
      mermaid: true,
      kotlinPlayground: true,
      playground: {
        presets: ["ts", "vue", "unocss"],
      },
      mathjax: {
        output: "chtml",
      },
      revealJs: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
        themes: [
          "auto",
          "beige",
          "black",
          "blood",
          "league",
          "moon",
          "night",
          "serif",
          "simple",
          "sky",
          "solarized",
          "white",
        ],
      },
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true,
    }),
  ],
});

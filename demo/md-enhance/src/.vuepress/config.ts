import { defineUserConfig } from "@vuepress/cli";
import { defaultTheme } from "@vuepress/theme-default";
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

const base = <"/" | `/${string}/`>process.env["BASE"] || "/";

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
        "/demo/card",
        "/demo/chart",
        "/demo/echarts",
        "/demo/code-demo",
        "/demo/code-tabs",
        "/demo/container",
        "/demo/figure",
        "/demo/flowchart",
        "/demo/footnote",
        "/demo/image-mark",
        "/demo/image-size",
        "/demo/include",
        "/demo/mark",
        "/demo/mermaid",
        "/demo/playground",
        "/demo/presentation",
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
      align: true,
      attrs: true,
      card: true,
      chart: true,
      codetabs: true,
      container: true,
      demo: true,
      echarts: true,
      figure: true,
      flowchart: true,
      gfm: true,
      imgLazyload: true,
      imgMark: true,
      imgSize: true,
      include: true,
      mark: true,
      mermaid: true,
      playground: {
        presets: ["ts", "vue"],
      },
      mathjax: {
        output: "chtml",
      },
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
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

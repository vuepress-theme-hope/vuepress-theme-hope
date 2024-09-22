import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress/cli";
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

const base = (process.env["BASE"] as "/" | `/${string}/`) || "/";

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
        "/demo/align",
        "/demo/attrs",
        "/demo/chart",
        "/demo/echarts",
        "/demo/code-demo",
        "/demo/component",
        "/demo/flowchart",
        "/demo/footnote",
        "/demo/include",
        "/demo/kotlin-playground",
        "/demo/mark",
        "/demo/markmap",
        "/demo/mermaid",
        "/demo/plantuml",
        "/demo/playground",
        "/demo/sandpack",
        "/demo/slide-page",
        "/demo/spoiler",
        "/demo/stylized",
        "/demo/sup-sub",
        "/demo/tasklist",
        "/demo/vue-playground",
      ],
    },
  }),

  plugins: [
    mdEnhancePlugin({
      align: true,
      attrs: true,
      chart: true,
      component: true,
      demo: true,
      echarts: true,
      flowchart: true,
      gfm: true,
      include: true,
      mark: true,
      markmap: true,
      mermaid: true,
      kotlinPlayground: true,
      plantuml: true,
      playground: {
        presets: ["ts", "vue", "unocss"],
      },
      sandpack: true,
      spoiler: true,
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({
            tag,
          }): {
            tag: string;
            attrs: Record<string, string>;
            content: string;
          } | void => {
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
      tasklist: true,
      vPre: true,
      vuePlayground: true,
    }),
  ],
});

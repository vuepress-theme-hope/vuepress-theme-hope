import { rollupTypescript } from "../../scripts/rollup.js";

export default [
  ...rollupTypescript("node/index", {
    external: [
      "node:module",
      /^@mdit\/plugin-/,
      "@vuepress/plugin-container",
      "@vuepress/shared",
      "@vuepress/utils",
      "markdown-it/lib/token.js",
      "markdown-it/lib/helpers/parse_link_label.js",
      /^mathjax-full\//,
      "vuepress-plugin-sass-palette",
      "vuepress-shared/node",
    ],
    dtsExternal: ["vuepress-shared", "vuepress-shared/node"],
    copy: [["client/styles", "client"]],
  }),
  ...rollupTypescript("client/compact/index", {
    external: ["vue", /\.scss$/],
    dtsExternal: [/\.scss$/],
    copy: [["compact/styles", "compact"]],
  }),
  ...rollupTypescript("client/components/ChartJS", {
    external: ["chart.js/auto", "vue", "vuepress-shared/client", /\.scss$/],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/CodeDemo", {
    external: [
      "balloon-css/balloon.css",
      "vue",
      "vuepress-shared/client",
      /\.scss$/,
    ],
    dtsExternal: ["balloon-css/balloon.css", /\.scss$/],
  }),
  ...rollupTypescript("client/components/CodeTabs", {
    external: ["@vuepress/client", "@vueuse/core", "vue", /\.scss$/],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/ECharts", {
    external: [
      "@vueuse/core",
      "echarts",
      "vue",
      "vuepress-shared/client",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/FlowChart", {
    external: [
      "@vueuse/core",
      "flowchart.js/src/flowchart.parse.js",
      "vue",
      "vuepress-shared/client",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/Mermaid", {
    external: [
      "@mermaid-js/mermaid-mindmap/dist/mermaid-mindmap.esm.min.mjs",
      "mermaid/dist/mermaid.esm.min.mjs",
      "vue",
      "vuepress-shared/client",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/Playground", {
    external: ["vue", "vuepress-shared/client", /\.scss$/],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/VuePlayground", {
    external: [
      "@vuepress/client",
      "@vue/repl",
      "@vue/repl/style.css",
      "vue",
      "vuepress-shared/client",
      /\.scss$/,
    ],
    dtsExternal: ["@vue/repl/style.css", /\.scss$/],
  }),
  ...rollupTypescript("client/components/Presentation", {
    external: [
      /^@temp/,
      "@vuepress/client",
      "vue",
      "vuepress-shared/client",
      /\.scss$/,
      /\.css$/,
    ],
    dtsExternal: [/\.scss$/, /\.css$/],
  }),
  ...rollupTypescript("client/components/Tabs", {
    external: ["@vuepress/client", "@vueuse/core", "vue", /\.scss$/],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/SlidePage", {
    external: [
      "@vuepress/client",
      "@vueuse/core",
      "vue",
      "vue-router",
      "vuepress-shared/client",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/reveal/index", {
    external: [/^reveal\.js/],
  }),
];

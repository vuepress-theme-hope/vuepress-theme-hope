import { rollupTypescript } from "../../scripts/rollup.js";

export default [
  ...rollupTypescript("node/index", {
    external: [
      "node:module",
      "vuepress-shared",
      "@vuepress/plugin-container",
      "@vuepress/shared",
      "@vuepress/utils",
      "juice",
      "markdown-it/lib/token.js",
      "markdown-it/lib/helpers/parse_link_label.js",
      /^mathjax-full\//,
      "katex",
      "vuepress-plugin-sass-palette",
    ],
    copy: [["client/styles", "client"]],
  }),
  ...rollupTypescript("client/compact/index", {
    external: ["vue", /\.scss$/],
    dtsExternal: [/\.scss$/],
    copy: [["compact/styles", "compact"]],
  }),
  ...rollupTypescript("client/components/ChartJS", {
    external: [
      "chart.js/auto/auto.mjs",
      "vue",
      "vuepress-shared/lib/client",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/CodeDemo", {
    external: [
      "balloon-css/balloon.css",
      "vue",
      "vuepress-shared/lib/client",
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
      "vuepress-shared/lib/client",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/FlowChart", {
    external: [
      "@vueuse/core",
      "flowchart.js/src/flowchart.parse.js",
      "vue",
      "vuepress-shared/lib/client",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/Mermaid", {
    external: ["mermaid", "vue", "vuepress-shared/lib/client", /\.scss$/],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/Playground", {
    external: ["vue", "vuepress-shared/lib/client", /\.scss$/],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/VuePlayground", {
    external: [
      "@vuepress/client",
      "@vue/repl",
      "@vue/repl/style.css",
      "vue",
      "vuepress-shared/lib/client",
      /\.scss$/,
    ],
    dtsExternal: ["@vue/repl/style.css", /\.scss$/],
  }),
  ...rollupTypescript("client/components/Presentation", {
    external: [
      /^@temp/,
      "@vuepress/client",
      "vue",
      "vuepress-shared/lib/client",
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
      "vuepress-shared/lib/client",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/reveal/index", {
    external: [/^reveal\.js/],
  }),
];

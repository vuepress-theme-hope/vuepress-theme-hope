import { rollupTypescript } from "../../scripts/rollup";

export default [
  ...rollupTypescript("node/index", {
    external: [
      "vuepress-shared",
      "@vuepress/plugin-container",
      "@vuepress/shared",
      "@vuepress/utils",
      "markdown-it/lib/token",
      "markdown-it/lib/helpers/parse_link_label",
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
    external: ["chart.js/auto", "vue", "vuepress-shared/lib/client", /\.scss$/],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/CodeDemo", {
    external: [
      "balloon-css/balloon.css",
      "vue",
      "vuepress-shared/lib/client",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
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
      "flowchart.js",
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
    external: ["@vuepress/client", "@vue/repl", "vue", /\.scss$/],
    dtsExternal: [/\.scss$/],
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

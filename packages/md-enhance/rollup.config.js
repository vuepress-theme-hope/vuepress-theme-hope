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
  ...rollupTypescript("client/components/ChartJS", {
    external: ["vuepress-shared/lib/client", "chart.js/auto", "vue", /\.scss$/],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/CodeDemo", {
    external: [
      "vuepress-shared/lib/client",
      "balloon-css/balloon.css",
      "vue",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/CodeTabs", {
    external: ["@vuepress/client", "@vueuse/core", "vue", /\.scss$/],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/FlowChart", {
    external: [
      "vuepress-shared/lib/client",
      "@vueuse/core",
      "flowchart.js",
      "ts-debounce",
      "vue",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/ECharts", {
    external: ["vuepress-shared/lib/client", "echarts", "vue", /\.scss$/],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/Mermaid", {
    external: ["vuepress-shared/lib/client", "mermaid", "vue", /\.scss$/],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/Presentation", {
    external: [
      /^@temp/,
      "vuepress-shared/lib/client",
      "@vuepress/client",
      "vue",
      /\.scss$/,
      /\.css$/,
    ],
    dtsExternal: [/\.scss$/, /\.css$/],
  }),
  ...rollupTypescript("client/SlidePage", {
    external: [
      "vuepress-shared/lib/client",
      "@vuepress/client",
      "@vueuse/core",
      "vue",
      "vue-router",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/Tabs", {
    external: ["@vuepress/client", "@vueuse/core", "vue", /\.scss$/],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/reveal/index", {
    external: [/^reveal\.js/],
  }),
];

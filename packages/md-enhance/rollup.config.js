import { rollupTypescript } from "../../scripts/rollup";

export default [
  ...rollupTypescript("node/index", {
    external: [
      "@mr-hope/vuepress-shared",
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
    external: [
      "@mr-hope/vuepress-shared/lib/client",
      "chart.js/auto",
      "vue",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/CodeDemo", {
    external: ["@mr-hope/vuepress-shared/lib/client", "vue", /\.scss$/],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/CodeGroup", {
    external: ["vue", /\.scss$/],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/CodeGroupItem", {
    external: ["vue", /\.scss$/],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/FlowChart", {
    external: [
      "@mr-hope/vuepress-shared/lib/client",
      "lodash.debounce",
      "flowchart.js",
      "vue",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/Mermaid", {
    external: [
      "@mr-hope/vuepress-shared/lib/client",
      "mermaid",
      "vue",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/Presentation", {
    external: [
      "@mr-hope/vuepress-shared/lib/client",
      "@temp/md-enhance/reveal-plugins",
      "@vuepress/client",
      /^reveal\.js/,
      "vue",
      /\.scss$/,
      /\.css$/,
    ],
    dtsExternal: [/\.scss$/, /\.css$/],
  }),
  ...rollupTypescript("client/SlidePage", {
    external: [
      "@mr-hope/vuepress-shared/lib/client",
      "@vuepress/client",
      "@vueuse/core",
      "vue",
      "vue-router",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
];

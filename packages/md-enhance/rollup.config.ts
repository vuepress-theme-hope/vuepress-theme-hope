import { rollupTypescript } from "../../scripts/rollup.js";

export default [
  ...rollupTypescript("node/index", {
    external: [
      "node:module",
      /^@mdit\/plugin-/,
      "@vuepress/plugin-container",
      "markdown-it/lib/token.js",
      "markdown-it/lib/helpers/parse_link_label.js",
      /^mathjax-full\//,
      "vuepress-plugin-sass-palette",
    ],
    dtsExternal: ["vuepress-shared"],
    copy: [["client/styles", "client"]],
  }),
  ...rollupTypescript("client/compact/index", {
    copy: [["client/compact/styles", "client/compact"]],
  }),
  ...rollupTypescript("client/components/ChartJS", {
    external: ["chart.js/auto"],
  }),
  ...rollupTypescript("client/components/CodeDemo", {
    external: ["balloon-css/balloon.css"],
  }),
  ...rollupTypescript("client/components/CodeTabs"),
  ...rollupTypescript("client/components/ECharts", {
    external: ["echarts"],
  }),
  ...rollupTypescript("client/components/FlowChart", {
    external: ["flowchart.ts"],
  }),
  ...rollupTypescript("client/components/Mermaid", {
    external: ["mermaid/dist/mermaid.esm.min.mjs"],
  }),
  ...rollupTypescript("client/components/Playground"),
  ...rollupTypescript("client/components/VuePlayground", {
    external: ["@vue/repl", "@vue/repl/style.css"],
    dtsExternal: ["@vue/repl/style.css"],
  }),
  ...rollupTypescript("client/components/Presentation"),
  ...rollupTypescript("client/components/Tabs"),
  ...rollupTypescript("client/SlidePage"),
  ...rollupTypescript("client/reveal/index", {
    external: [/^reveal\.js/],
  }),
];

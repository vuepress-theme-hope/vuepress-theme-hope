import { bundle } from "../../scripts/rollup.js";

export default [
  ...bundle("node/index", {
    external: [
      /^@mdit\/plugin-/,
      "js-yaml",
      "markdown-it/lib/token.js",
      "markdown-it/lib/helpers/parse_link_label.js",
    ],
    dtsExternal: ["vuepress-shared"],
  }),
  ...bundle(
    {
      base: "client",
      files: [
        "index",
        "compact/index",
        "components/ChartJS",
        "components/CodeDemo",
        "components/CodeTabs",
        "components/ECharts",
        "components/FlowChart",
        "components/Mermaid",
        "components/Playground",
        "components/Presentation",
        "components/Tabs",
        "components/VPCard",
        "components/VuePlayground",
        "SlidePage",
      ],
    },

    {
      external: [
        "@mermaid",
        "@vue/repl",
        "balloon-css/balloon.css",
        "chart.js/auto",
        "echarts",
        "flowchart.ts",
        "mermaid",
        /^reveal\.js/,
      ],
      copy: [
        ["client/styles", "client"],
        ["client/compact/styles", "client/compact"],
      ],
    }
  ),
];

import { bundle } from "../../scripts/rollup.js";

export default [
  ...bundle("node/index", {
    external: [
      /^@mdit\/plugin-/,
      "markdown-it/lib/token.js",
      "markdown-it/lib/helpers/parse_link_label.js",
    ],
    dtsExternal: ["vuepress-shared"],
  }),
  ...bundle(
    {
      base: "client",
      files: [
        "compact/index",
        "components/ChartJS",
        "components/CodeDemo",
        "components/CodeTabs",
        "components/FlowChart",
        "components/Mermaid",
        "components/Playground",
        "components/Presentation",
        "components/Tabs",
        "SlidePage",
        "reveal/index",
      ],
    },

    {
      external: [
        "@mermaid-js/mermaid-mindmap/dist/mermaid-mindmap.esm.min.mjs",
        "@vue/repl",
        "balloon-css/balloon.css",
        "chart.js/auto",
        "echarts",
        "flowchart.ts",
        "mermaid/dist/mermaid.esm.min.mjs",
        /^reveal\.js/,
      ],
      copy: [
        ["client/styles", "client"],
        ["client/compact/styles", "client/compact"],
      ],
    }
  ),
];

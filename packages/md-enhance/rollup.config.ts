import { rollupBundle } from "../../scripts/rollup.js";

export default [
  ...rollupBundle("node/index", {
    external: [
      /^@mdit\/plugin-/,
      "js-yaml",
      "markdown-it/lib/token.js",
      "markdown-it/lib/helpers/parse_link_label.js",
    ],
    dtsExternal: ["vuepress-shared"],
  }),
  ...rollupBundle(
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
        "components/KotlinPlayground",
        "components/MarkMap",
        "components/MdDemo",
        "components/Mermaid",
        "components/Playground",
        "components/RevealJs",
        "components/Tabs",
        "components/VuePlayground",
        "composables/hint",
        "composables/katex",
        "SlidePage",
      ],
    },

    {
      external: [
        "@mermaid",
        "@vue/repl",
        "@vue/repl/codemirror-editor",
        "balloon-css/balloon.css",
        "chart.js/auto",
        "echarts",
        "flowchart.ts",
        "katex/dist/contrib/copy-tex.min.js",
        "mermaid",
        /^reveal\.js/,
      ],
      copy: [
        ["client/styles", "client"],
        ["client/compact/styles", "client/compact"],
      ],
    },
  ),
];

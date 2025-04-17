import { rollupBundle } from "../../scripts/rollup.js";

export default [
  ...rollupBundle("node/index", {
    external: [/^@mdit\/plugin-/],
    dtsExternal: ["vuepress-shared"],
  }),
  ...rollupBundle(
    {
      base: "client",
      files: [
        "index",
        "components/ChartJS",
        "components/CodeDemo",
        "components/ECharts",
        "components/FlowChart",
        "components/KotlinPlayground",
        "components/MarkMap",
        "components/MdDemo",
        "components/Mermaid",
        "components/Playground",
        "components/SandPack",
        "components/VuePlayground",
      ],
    },

    {
      external: [
        "@vue/repl",
        "@vue/repl/codemirror-editor",
        "@vue/repl/monaco-editor",
        "@vuepress/helper/noopComponent",
        "balloon-css/balloon.css",
        "chart.js/auto",
        "echarts",
        "flowchart.ts",
        "kotlin-playground",
        "markmap-lib",
        "markmap-toolbar",
        "markmap-view",
        "mermaid/dist/mermaid.esm.min.mjs",
        "sandpack-vue3",
      ],
      copy: [
        ["client/styles", "client"],
        ["client/compact/styles", "client/compact"],
      ],
    },
  ),
];

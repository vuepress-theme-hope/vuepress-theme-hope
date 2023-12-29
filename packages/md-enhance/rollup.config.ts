import { rollupBundle } from "../../scripts/rollup.js";

export default [
  ...rollupBundle("node/index", {
    external: [/^@mdit\/plugin-/, "js-yaml"],
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
        "components/SandPack",
        "components/Tabs",
        "components/VuePlayground",
        "composables/hint",
        "composables/katex",
        "SlidePage",
      ],
    },

    {
      external: [
        "@vue/repl",
        "@vue/repl/codemirror-editor",
        "balloon-css/balloon.css",
        "chart.js/auto",
        "echarts",
        "flowchart.ts",
        "katex/dist/contrib/copy-tex.min.js",
        "kotlin-playground",
        "markmap-lib",
        "markmap-toolbar",
        "markmap-view",
        "mermaid",
        /^reveal\.js/,
        "sandpack-vue3",
      ],
      copy: [
        ["client/styles", "client"],
        ["client/compact/styles", "client/compact"],
      ],
    },
  ),
];

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
        "components/CodeDemo",
        "components/KotlinPlayground",
        "components/MdDemo",
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
        "kotlin-playground",
        "sandpack-vue3",
      ],
      copy: [
        ["client/styles", "client"],
        ["client/compact/styles", "client/compact"],
      ],
    },
  ),
];

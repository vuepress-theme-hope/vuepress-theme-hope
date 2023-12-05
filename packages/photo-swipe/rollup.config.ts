import { rollupBundle } from "../../scripts/rollup.js";

export default [
  ...rollupBundle("node/index", {
    dtsExternal: ["vuepress-shared"],
  }),
  ...rollupBundle(
    { base: "client", files: ["config", "index"] },
    {
      external: ["photoswipe"],
      copy: [["client/styles", "client"]],
    },
  ),
];

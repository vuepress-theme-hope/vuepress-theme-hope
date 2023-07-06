import { bundle } from "../../scripts/rollup.js";

export default [
  ...bundle("node/index", {
    dtsExternal: ["vuepress-shared"],
  }),
  ...bundle(
    { base: "client", files: ["config", "index"] },
    {
      external: ["photoswipe"],
      copy: [["client/styles", "client"]],
    },
  ),
];

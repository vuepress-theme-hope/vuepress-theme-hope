import { rollupBundle } from "../../scripts/rollup.js";

export default [
  ...rollupBundle("node/index", {
    dtsExternal: ["vuepress-shared"],
  }),
  ...rollupBundle("client/config"),
];

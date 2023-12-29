import { rollupBundle } from "../../scripts/rollup.js";

export default [
  ...rollupBundle("node/index", {
    external: ["chokidar"],
    dtsExternal: ["vuepress-shared"],
  }),
  ...rollupBundle("client/index"),
];

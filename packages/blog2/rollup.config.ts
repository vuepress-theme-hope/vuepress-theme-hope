import { bundle } from "../../scripts/rollup.js";

export default [
  ...bundle("node/index", {
    external: ["chokidar"],
    dtsExternal: ["vuepress-shared"],
  }),
  ...bundle("client/index"),
];

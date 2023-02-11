import { rollupTypescript } from "../../scripts/rollup.js";

export default [
  ...rollupTypescript("node/index", {
    external: ["chokidar"],
    dtsExternal: ["vuepress-shared"],
  }),
  ...rollupTypescript("client/index", {}),
];

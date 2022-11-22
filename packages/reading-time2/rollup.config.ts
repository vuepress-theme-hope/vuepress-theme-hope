import { rollupTypescript } from "../../scripts/rollup.js";

export default rollupTypescript("node/index", {
  external: ["vuepress-shared/node"],
  dtsExternal: ["vuepress-shared/node"],
});

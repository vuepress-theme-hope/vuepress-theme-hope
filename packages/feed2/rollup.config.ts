import { rollupTypescript } from "../../scripts/rollup.js";

export default rollupTypescript("node/index", {
  external: [
    "node:path",
    "@vuepress/shared",
    "@vuepress/utils",
    "vuepress-shared/node",
    "xml-js",
  ],
  dtsExternal: ["vuepress-shared"],
});

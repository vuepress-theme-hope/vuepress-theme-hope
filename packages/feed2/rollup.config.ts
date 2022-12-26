import { rollupTypescript } from "../../scripts/rollup.js";

export default rollupTypescript("node/index", {
  external: [
    "@vuepress/shared",
    "@vuepress/utils",
    "vuepress-shared/node",
    "xml-js",
  ],
  dtsExternal: ["vuepress-shared"],
});

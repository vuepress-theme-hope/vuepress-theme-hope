import { rollupTypescript } from "../../scripts/rollup.js";

export default rollupTypescript("node/index", {
  external: [
    "vuepress-shared",
    "@vuepress/shared",
    "@vuepress/utils",
    "node:path",
    "xml-js",
  ],
});

import { rollupTypescript } from "../../scripts/rollup";

export default rollupTypescript("node/index", {
  external: [
    "vuepress-shared",
    "@vuepress/shared",
    "@vuepress/utils",
    "path",
    "xml-js",
  ],
});

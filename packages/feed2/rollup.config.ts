import { rollupTypescript } from "../../scripts/rollup.js";

export default rollupTypescript("node/index", {
  external: [
    "@vuepress/shared",
    "@vuepress/utils",
    "vuepress-shared/node",
    "cheerio",
    "xml-js",
  ],
  dtsExternal: ["vuepress-shared/node"],
});

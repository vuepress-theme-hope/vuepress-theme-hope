import { rollupTypescript } from "../../scripts/rollup";

export default rollupTypescript("node/index", {
  external: [
    "@vuepress/core",
    "@vuepress/shared",
    "@vuepress/utils",
    "gray-matter",
    "vuepress-shared",
  ],
});

import { rollupTypescript } from "../../script/rollup";

export default rollupTypescript("node/index", {
  external: [
    "@mr-hope/vuepress-shared",
    "@vuepress/core",
    "@vuepress/client",
    "chalk",
    "fs-extra",
    "path",
    "sitemap",
  ],
});

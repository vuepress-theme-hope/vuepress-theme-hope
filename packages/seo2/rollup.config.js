import { rollupTypescript } from "../../scripts/rollup";

export default rollupTypescript("node/index", {
  external: ["@mr-hope/vuepress-shared", "@vuepress/core", "@vuepress/utils"],
});

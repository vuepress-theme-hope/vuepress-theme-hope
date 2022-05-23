import { rollupTypescript } from "../../scripts/rollup";

export default rollupTypescript("node/index", {
  external: ["vuepress-shared", "@vuepress/utils", "chokidar"],
});

import { rollupTypescript } from "../../scripts/rollup.js";

export default rollupTypescript("node/index", {
  external: ["@vuepress/utils", "chokidar", "vuepress-shared/node"],
});

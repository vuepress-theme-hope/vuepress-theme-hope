import { rollupTypescript } from "../../scripts/rollup";

export default rollupTypescript("node/index", {
  external: ["@vuepress/utils", "vuepress-plugin-sass-palette"],
});

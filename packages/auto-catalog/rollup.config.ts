import { rollupTypescript } from "../../scripts/rollup.js";

export default [
  ...rollupTypescript("node/index", {
    external: ["@vuepress/core", "vuepress-shared/node"],
  }),
];

import { bundle } from "../../scripts/rollup.js";

export default [
  ...bundle("cli/index", {
    external: ["node:module", "@vuepress/cli", "cac"],
  }),
  ...bundle("node/index"),
];

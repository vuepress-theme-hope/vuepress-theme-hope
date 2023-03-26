import { bundle } from "../../scripts/rollup.js";

export default [
  ...bundle("cli/index", {
    external: ["@vuepress/cli", "cac"],
  }),
  ...bundle({
    base: "client",
    files: ["config"],
  }),
  ...bundle("node/index"),
];

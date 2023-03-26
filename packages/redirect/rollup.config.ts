import { bundle } from "../../scripts/rollup.js";

export default [
  ...bundle("cli/index", {
    external: ["@vuepress/cli", "cac"],
  }),
  ...bundle(
    {
      base: "client",
      files: ["config"],
    },
    {
      copy: [["client/styles", "client"]],
    }
  ),
  ...bundle("node/index"),
];

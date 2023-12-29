import { rollupBundle } from "../../scripts/rollup.js";

export default [
  ...rollupBundle("cli/index", {
    external: ["@vuepress/cli", "cac"],
  }),
  ...rollupBundle(
    {
      base: "client",
      files: ["config"],
    },
    {
      copy: [["client/styles", "client"]],
    },
  ),
  ...rollupBundle("node/index"),
];

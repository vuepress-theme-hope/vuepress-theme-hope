import { rollupBundle } from "../../scripts/rollup.js";

export default [
  ...rollupBundle("cli/index", {
    external: ["cac", "vuepress/cli"],
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

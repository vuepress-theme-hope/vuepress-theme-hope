import { rollupBundle } from "../../scripts/rollup.js";

export default rollupBundle("index", {
  dts: false,
  resolve: true,
  external: ["@inquirer/prompts", "commander"],
  output: {
    format: "esm",
    sourcemap: false,
  },
  preserveShebang: true,
});

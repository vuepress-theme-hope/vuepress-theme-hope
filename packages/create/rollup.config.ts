import { rollupBundle } from "../../scripts/rollup.js";

export default rollupBundle("index", {
  dts: false,
  resolve: true,
  external: ["@inquirer/prompts", "commander", "execa"],
  output: {
    format: "esm",
    sourcemap: false,
  },
  preserveShebang: true,
});

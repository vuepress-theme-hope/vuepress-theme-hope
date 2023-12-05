import { rollupBundle } from "../../scripts/rollup.js";

export default rollupBundle("index", {
  dts: false,
  resolve: true,
  external: ["cac", "execa", "inquirer"],
  output: {
    format: "esm",
    sourcemap: false,
  },
  preserveShebang: true,
});

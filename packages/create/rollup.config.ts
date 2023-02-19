import { bundle } from "../../scripts/rollup.js";

export default bundle("index", {
  dts: false,
  resolve: true,
  external: ["node:module", "cac", "execa", "inquirer"],
  output: {
    format: "esm",
    sourcemap: false,
  },
  preserveShebang: true,
});

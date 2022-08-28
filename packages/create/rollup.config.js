import { rollupTypescript } from "../../scripts/rollup";

export default rollupTypescript("index", {
  dts: false,
  resolve: true,
  external: ["node:module", "cac", "execa", "inquirer"],
  output: {
    format: "esm",
    sourcemap: false,
  },
  preserveShebang: true,
});

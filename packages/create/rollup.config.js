import { rollupTypescript } from "../../scripts/rollup";

export default rollupTypescript("index", {
  dts: false,
  resolve: true,
  external: ["cac", "execa", "inquirer"],
  output: {
    sourcemap: false,
  },
  preserveShebang: true,
});

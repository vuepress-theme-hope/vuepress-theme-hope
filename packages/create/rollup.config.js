import { rollupTypescript } from "../../scripts/rollup";

export default rollupTypescript("index", {
  dts: false,
  resolve: true,
  output: {
    sourcemap: false,
  },
  preserveShebang: true,
});

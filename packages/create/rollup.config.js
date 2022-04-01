import { rollupTypescript } from "../../scripts/rollup";

export default rollupTypescript("index", {
  dts: false,
  resolve: true,
  external: ["fs", "https", "path"],
  output: {
    sourcemap: false,
  },
  preserveShebang: true,
});

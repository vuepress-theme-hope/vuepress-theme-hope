import { rollupBundle } from "../../scripts/rollup.js";

export default [
  ...rollupBundle("node/index"),
  ...rollupBundle(
    { base: "client", files: ["config", "index"] },
    {
      external: [/^lightgallery/],
    },
  ),
];

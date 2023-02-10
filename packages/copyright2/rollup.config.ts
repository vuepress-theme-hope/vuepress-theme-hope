import { rollupTypescript } from "../../scripts/rollup.js";

export default [
  ...rollupTypescript("node/index", {
    dtsExternal: ["vuepress-shared"],
  }),
  ...rollupTypescript("client/config", {}),
];

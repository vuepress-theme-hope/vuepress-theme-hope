import { bundle } from "../../scripts/rollup.js";

export default [
  ...bundle("node/index", {
    dtsExternal: ["vuepress-shared"],
  }),
  ...bundle("client/config"),
];

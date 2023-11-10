import { rollupBundle } from "../../scripts/rollup.js";

export default [
  ...rollupBundle("node/index", {
    dtsExternal: ["vuepress-shared"],
  }),
  ...rollupBundle("client/config", {
    external: ["balloon-css/balloon.css"],
    copy: [["client/styles", "client"]],
  }),
];

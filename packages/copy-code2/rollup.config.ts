import { rollupTypescript } from "../../scripts/rollup.js";

export default [
  ...rollupTypescript("node/index", {
    external: ["vuepress-plugin-sass-palette"],
    dtsExternal: ["vuepress-shared"],
  }),
  ...rollupTypescript("client/config", {
    external: ["balloon-css/balloon.css"],
    copy: [["client/styles", "client"]],
  }),
];

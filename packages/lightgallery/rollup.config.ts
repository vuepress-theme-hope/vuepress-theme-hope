import { bundle } from "../../scripts/rollup.js";

export default [
  ...bundle("node/index", {
    external: ["vuepress-plugin-sass-palette"],
  }),
  ...bundle("client/config", {
    external: [/^lightgallery/],
  }),
];

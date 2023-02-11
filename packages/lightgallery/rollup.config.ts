import { rollupTypescript } from "../../scripts/rollup.js";

export default [
  ...rollupTypescript("node/index", {
    external: ["vuepress-plugin-sass-palette"],
  }),
  ...rollupTypescript("client/config", {
    external: [/^lightgallery/],
  }),
];

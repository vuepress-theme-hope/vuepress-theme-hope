import { rollupTypescript } from "../../scripts/rollup.js";

export default [
  ...rollupTypescript("node/index", {
    external: [
      "@vuepress/utils",
      "vuepress-plugin-sass-palette",
      "vuepress-shared/node",
    ],
  }),
  ...rollupTypescript("client/config", {
    external: [
      "@vuepress/client",
      /^lightgallery/,
      "vue",
      "vue-router",
      /.scss$/u,
    ],
    dtsExternal: [/.scss$/u],
  }),
];

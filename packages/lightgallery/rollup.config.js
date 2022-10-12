import { rollupTypescript } from "../../scripts/rollup.js";

export default [
  ...rollupTypescript("node/index", {
    external: [
      "@vuepress/utils",
      "vue",
      "vuepress-plugin-sass-palette",
      "vuepress-shared",
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
    resolve: true,
  }),
];

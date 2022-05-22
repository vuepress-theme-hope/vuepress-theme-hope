import { rollupTypescript } from "../../scripts/rollup";

export default [
  ...rollupTypescript("node/index", {
    external: [
      "vuepress-shared",
      "@vuepress/utils",
      "vue",
      "vuepress-plugin-sass-palette",
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

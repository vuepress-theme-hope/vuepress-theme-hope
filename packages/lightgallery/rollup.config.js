import { rollupTypescript } from "../../scripts/rollup";

export default [
  ...rollupTypescript("node/index", {
    external: [
      "@mr-hope/vuepress-shared",
      "@vuepress/utils",
      "vue",
      "vuepress-plugin-sass-palette",
    ],
  }),
  ...rollupTypescript("client/root-components/LightGallery", {
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

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
    resolve: true,
    external: [
      "@mr-hope/vuepress-shared/client",
      "@vuepress/client",
      "vue",
      "vue-router",
      /.scss$/u,
    ],
    dtsExternal: [/.scss$/u],
  }),
];

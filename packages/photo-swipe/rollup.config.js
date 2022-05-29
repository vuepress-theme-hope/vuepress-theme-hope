import { rollupTypescript } from "../../scripts/rollup";

export default [
  ...rollupTypescript("node/index", {
    external: [
      "vuepress-shared",
      "@vuepress/utils",
      "vuepress-plugin-sass-palette",
    ],
  }),
  ...rollupTypescript("client/config", {
    external: [
      "@vuepress/client",
      "@vueuse/core",
      "photoswipe",
      "vue",
      "vue-router",
      "vuepress-shared/lib/client",
      /\.css$/,
    ],
    dtsExternal: [/\.css$/],
  }),
];

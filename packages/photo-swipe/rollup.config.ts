import { rollupTypescript } from "../../scripts/rollup.js";

export default [
  ...rollupTypescript("node/index", {
    external: [
      "@vuepress/utils",
      "vuepress-plugin-sass-palette",
      "vuepress-shared/node",
    ],
    dtsExternal: ["vuepress-shared"],
  }),
  ...rollupTypescript("client/config", {
    external: [
      "@vuepress/client",
      "@vuepress/shared",
      "@vueuse/core",
      "photoswipe",
      "vue",
      "vue-router",
      "vuepress-shared/client",
      /\.css$/,
    ],
    dtsExternal: [/\.css$/],
  }),
];

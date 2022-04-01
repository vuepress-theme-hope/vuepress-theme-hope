import { rollupTypescript } from "../../scripts/rollup";

export default [
  ...rollupTypescript("node/index", {
    external: [
      "@mr-hope/vuepress-shared",
      "@vuepress/utils",
      "vuepress-plugin-sass-palette",
    ],
  }),
  ...rollupTypescript("client/appSetup", {
    external: [
      "@vuepress/client",
      "@vueuse/core",
      "photoswipe",
      "vue",
      "vue-router",
      /\.css$/,
    ],
    dtsExternal: [/\.css$/],
  }),
];

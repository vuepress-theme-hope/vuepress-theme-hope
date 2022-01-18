import { rollupTypescript, rollupVue } from "../../scripts/rollup";

export default [
  ...rollupTypescript("node/index", {
    external: [
      "@mr-hope/vuepress-shared",
      "@vuepress/utils",
      "vuepress-plugin-sass-palette",
    ],
  }),
  ...rollupVue("client/root-components/ImageViewer.ts", {
    external: [
      "@mr-hope/vuepress-shared/lib/client",
      "@vuepress/client",
      "photoswipe",
      "photoswipe/dist/photoswipe-ui-default",
      "vue",
      "vue-router",
      /\.css$/,
      /\.scss$/,
    ],
    dts: false,
    dtsExternal: [/\.css$/, /\.scss$/],
    copy: [["client/styles", "client"]],
  }),
];

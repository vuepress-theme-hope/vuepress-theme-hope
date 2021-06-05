import { rollupTypescript, rollupVue } from "../../script/rollup";

export default [
  ...rollupTypescript("node/index", {
    external: ["@mr-hope/vuepress-shared", "@vuepress/utils"],
  }),
  ...rollupVue("client/root-components/PhotoSwipe.vue", {
    external: [
      "@vuepress/client",
      "photoswipe",
      "photoswipe/dist/photoswipe-ui-default",
      "vue",
      "vue-router",
      /\.css$/,
      /\.scss$/,
    ],
    dtsExternal: [/\.css$/, /\.scss$/],
    copy: [["client/styles", "client"]],
  }),
];

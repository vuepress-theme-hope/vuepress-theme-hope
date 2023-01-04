import { rollupTypescript } from "../../scripts/rollup.js";

export default [
  ...rollupTypescript("node/index", {
    external: [
      "vuepress-shared",
      "@vuepress/core",
      "@vuepress/utils",
      "vuepress-shared/node",
      "vuepress-plugin-sass-palette",
    ],
    dtsExternal: ["vuepress-shared"],
  }),
  ...rollupTypescript("client/config", {
    external: [
      "@vuepress/client",
      "@vuepress/shared",
      "balloon-css/balloon.css",
      "vue",
      "vue-router",
      "vuepress-shared/client",
      /\.scss$/,
    ],
    dtsExternal: ["balloon-css/balloon.css", /\.scss$/],
    copy: [["client/styles", "client"]],
  }),
];

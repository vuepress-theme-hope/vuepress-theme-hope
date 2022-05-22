import { rollupTypescript } from "../../scripts/rollup";

export default [
  ...rollupTypescript("node/index", {
    external: [
      "vuepress-shared",
      "@vuepress/core",
      "@vuepress/utils",
      "vuepress-plugin-sass-palette",
    ],
  }),
  ...rollupTypescript("client/config", {
    external: [
      "vuepress-shared/lib/client",
      "@vuepress/client",
      "balloon-css/balloon.css",
      "vue",
      "vue-router",
      /\.scss$/,
    ],
    dtsExternal: ["balloon-css/balloon.css", /\.scss$/],
    copy: [["client/styles", "client"]],
  }),
];

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
  ...rollupTypescript("client/appSetup", {
    external: [
      "@mr-hope/vuepress-shared/client",
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

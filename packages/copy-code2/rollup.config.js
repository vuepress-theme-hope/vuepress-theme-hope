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
      "@mr-hope/vuepress-shared/styles/config/index.scss",
      "@vuepress/client",
      "balloon-css",
      "vue",
      "vue-router",
      /\.scss$/,
    ],
    dtsExternal: ["balloon-css", /\.scss$/],
    copy: [["client/styles", "client"]],
  }),
];

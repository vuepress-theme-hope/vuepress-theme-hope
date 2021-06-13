import { rollupTypescript } from "../../scripts/rollup";

export default [
  ...rollupTypescript("node/index", {
    external: [
      "@mr-hope/vuepress-shared",
      "@vuepress/utils",
      "vuepress-plugin-sass-palette",
      "vuepress-plugin-reading-time2",
    ],
  }),
  ...rollupTypescript("client/appEnhance", {
    external: [
      "@mr-hope/vuepress-shared/client",
      "@vuepress/client",
      "balloon-css",
      "vue",
      "vue-router",
      "@Waline",
      /\.scss$/,
    ],
    dtsExternal: ["balloon-css", /\.scss$/],
    copy: [["client/styles", "client"]],
  }),
  ...rollupTypescript("client/components/Waline", {
    external: [
      "@mr-hope/vuepress-shared/client",
      "@vuepress/client",
      "@waline/client",
      "vue",
      "vue-router",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
];

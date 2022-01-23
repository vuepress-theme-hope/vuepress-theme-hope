import { rollupTypescript } from "../../scripts/rollup";

export default [
  ...rollupTypescript("node/index", {
    external: [
      "@mr-hope/vuepress-shared",
      "@vuepress/utils",
      "vuepress-plugin-sass-palette",
    ],
  }),
  ...rollupTypescript("client/appEnhance", {
    external: [
      "@mr-hope/vuepress-shared/lib/client",
      "@vuepress/client",
      "vue",
      "vue-router",
      "@Waline",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
    copy: [["client/styles", "client"]],
  }),
  ...rollupTypescript("client/components/Waline", {
    external: [
      "@mr-hope/vuepress-shared/lib/client",
      "@vuepress/client",
      "@waline/client",
      "vue",
      "vue-router",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
];

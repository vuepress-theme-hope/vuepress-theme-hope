import { rollupTypescript } from "../../scripts/rollup.js";

export default [
  ...rollupTypescript("node/index", {
    external: [
      "@vuepress/shared",
      "@vuepress/utils",
      "cheerio",
      "chokidar",
      "vuepress-plugin-sass-palette",
      "vuepress-shared/node",
    ],
    dtsExternal: ["vuepress-shared"],
  }),
  ...rollupTypescript("client/components/SearchResult", {
    resolve: true,
    external: [
      "@vuepress/client",
      "@vueuse/core",
      "body-scroll-lock",
      "vue",
      "vue-router",
      "vuepress-shared/client",
      /^@temp\//,
      /\.scss$/,
    ],
    copy: [["client/styles", "client"]],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/config", {
    resolve: true,
    external: [
      /^@temp\//,
      "@vuepress/client",
      "vue",
      "vuepress-plugin-search-pro/result",
      "vuepress-shared/client",
      /\.scss$/,
    ],
    copy: [["client/styles", "client"]],
    dtsExternal: [/\.scss$/],
  }),
];

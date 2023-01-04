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
    external: [
      "@vuepress/client",
      "@vuepress/shared",
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
    external: [
      /^@temp\//,
      "@vuepress/client",
      "@vueuse/core",
      "vue",
      "vuepress-plugin-search-pro/result",
      "vuepress-shared/client",
      /\.scss$/,
    ],
    copy: [["client/styles", "client"]],
    dtsExternal: [/\.scss$/],
  }),
];

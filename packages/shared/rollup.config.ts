import { rollupTypescript } from "../../scripts/rollup.js";

export default [
  ...rollupTypescript("node/index", {
    resolve: true,
    external: [
      "node:http",
      "@vuepress/plugin-git",
      "@vuepress/utils",
      "@vuepress/shared",
      "cheerio",
      "execa",
      "gray-matter",
      "fflate/node",
      "striptags",
    ],
    dtsExternal: ["node:http"],
  }),
  ...rollupTypescript("client/index", {
    resolve: true,
    external: [
      "@vuepress/client",
      "@vuepress/shared",
      "fflate/browser",
      "vue",
      "vue-router",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
    copy: [["client/styles", "client"]],
  }),
  ...rollupTypescript("client/noopModule", {
    external: ["vue"],
  }),
];

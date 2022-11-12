import { rollupTypescript } from "../../scripts/rollup.js";

export default [
  ...rollupTypescript("node/index", {
    resolve: true,
    external: [
      "node:http",
      "@vuepress/plugin-git",
      "@vuepress/utils",
      "@vuepress/shared",
      "execa",
      "fflate/node",
      "ora",
      "striptags",
      "vite",
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

import { rollupTypescript } from "../../scripts/rollup.js";

export default [
  ...rollupTypescript("node/index", {
    resolve: true,
    external: [
      "@vuepress/plugin-git",
      "@vuepress/utils",
      "@vuepress/shared",
      "execa",
      "node:http",
      "ora",
      "vite",
    ],
    dtsExternal: ["node:http"],
  }),
  ...rollupTypescript("client/index", {
    resolve: true,
    external: ["@vuepress/client", "ora", "vue", "vue-router", /\.scss$/],
    dtsExternal: [/\.scss$/],
    copy: [["client/styles", "client"]],
  }),
  ...rollupTypescript("client/noopModule", {
    external: ["vue"],
  }),
];

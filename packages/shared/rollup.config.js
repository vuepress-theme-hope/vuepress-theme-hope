import { rollupTypescript } from "../../scripts/rollup";

export default [
  ...rollupTypescript("node/index", {
    resolve: true,
    external: [
      "@vuepress/plugin-git",
      "@vuepress/utils",
      "@vuepress/shared",
      "execa",
      "http",
      "ora",
      "vite",
    ],
    dtsExternal: ["http"],
  }),
  ...rollupTypescript("client/index", {
    resolve: true,
    external: [
      "@vuepress/client",
      "@vuepress/plugin-theme-data/lib/client",
      "ora",
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

import { rollupTypescript } from "../../scripts/rollup.js";

export default [
  ...rollupTypescript("node/index", {
    external: [
      "node:module",
      "@vuepress/core",
      "@vuepress/shared",
      "@vuepress/utils",
      "vuepress-shared/node",
      "vuepress-plugin-components",
      "vuepress-plugin-sass-palette",
    ],
  }),
];

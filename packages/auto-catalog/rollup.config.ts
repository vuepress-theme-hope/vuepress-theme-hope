import { rollupTypescript } from "../../scripts/rollup.js";

export default [
  ...rollupTypescript("node/index", {
    external: [
      "@vuepress/core",
      "@vuepress/shared",
      "@vuepress/utils",
      "vuepress-shared/node",
      "vuepress-plugin-sass-palette",
    ],
  }),
  ...rollupTypescript("client/config", {
    external: [
      "@vuepress/client",
      "vuepress-shared/client",
      /^vuepress-plugin-components\/client\//,
    ],
  }),
];

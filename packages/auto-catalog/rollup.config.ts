import { rollupTypescript } from "../../scripts/rollup.js";

export default [
  ...rollupTypescript("node/index", {
    external: [
      "@vuepress/core",
      "@vuepress/shared",
      "@vuepress/utils",
      "vuepress-shared/node",
      "vuepress-plugin-components",
      "vuepress-plugin-sass-palette",
    ],
  }),
  ...rollupTypescript("client/config", {
    external: [
      "@vuepress/client",
      "vue",
      "vuepress-shared/client",
      /^vuepress-plugin-components\/client\//,
    ],
  }),
];

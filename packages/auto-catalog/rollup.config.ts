import { rollupTypescript } from "../../scripts/rollup.js";

export default [
  ...rollupTypescript("node/index", {
    external: [
      "node:module",
      "vuepress-plugin-components",
      "vuepress-plugin-sass-palette",
    ],
  }),
  ...rollupTypescript("client/config", {
    external: [/^vuepress-plugin-components\/client\//],
    copy: [["client/styles", "client"]],
  }),
];

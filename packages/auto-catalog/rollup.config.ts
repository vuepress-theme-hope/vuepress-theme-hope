import { bundle } from "../../scripts/rollup.js";

export default [
  ...bundle("node/index", {
    external: [
      "node:module",
      "vuepress-plugin-components",
      "vuepress-plugin-sass-palette",
    ],
  }),
  ...bundle("client/config", {
    external: [/^vuepress-plugin-components\/client\//],
    copy: [["client/styles", "client"]],
  }),
];

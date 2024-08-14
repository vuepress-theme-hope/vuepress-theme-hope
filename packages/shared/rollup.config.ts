import { rollupBundle } from "../../scripts/rollup.js";

export default [
  ...rollupBundle("node/index", {
    resolve: true,
    external: ["node:http", "@vuepress/helper", "vuepress/utils"],
    dtsExternal: [
      "node:http",
      "@vuepress/helper",
      "vuepress/core",
      "vuepress/shared",
    ],
  }),
  ...rollupBundle("client/index", {
    resolve: true,
    external: ["@vuepress/helper/client", "vuepress/client", "vue"],
    copy: [["client/styles", "client"]],
    dtsExternal: [
      "@vuepress/helper/client",
      "vuepress/client",
      "vuepress/shared",
    ],
  }),
];

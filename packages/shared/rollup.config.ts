import { rollupBundle } from "../../scripts/rollup.js";

export default [
  ...rollupBundle("node/index", {
    resolve: true,
    external: [
      "@vuepress/helper",
      "node:http",
      "vuepress/utils",
      "cheerio",
      "execa",
      "fflate/node",
      "gray-matter",
      "semver",
      "striptags",
    ],
    dtsExternal: [
      "node:http",
      "@vuepress/helper",
      "vuepress/core",
      "vuepress/shared",
    ],
  }),
  ...rollupBundle("client/index", {
    resolve: true,
    external: [
      "@vuepress/helper/client",
      "vuepress/client",
      "fflate/browser",
      "vue",
    ],
    copy: [["client/styles", "client"]],
    dtsExternal: ["@vuepress/helper/client", "vuepress/shared"],
  }),
];

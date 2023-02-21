import { bundle } from "../../scripts/rollup.js";

export default [
  ...bundle("node/index", {
    resolve: true,
    external: [
      "node:http",
      "@vuepress/utils",
      "cheerio",
      "execa",
      "gray-matter",
      "fflate/node",
      "striptags",
    ],
    dtsExternal: ["node:http"],
  }),
  ...bundle(
    { base: "client", files: ["index", "noopModule"] },
    {
      resolve: true,
      external: ["@vuepress/client", "fflate/browser", "vue", "vue-router"],
      copy: [["client/styles", "client"]],
    }
  ),
];

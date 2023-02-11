import { rollupTypescript } from "../../scripts/rollup.js";

export default [
  ...rollupTypescript("node/index", {
    resolve: true,
    external: [
      "node:http",
      "@vuepress/plugin-git",
      "cheerio",
      "execa",
      "gray-matter",
      "fflate/node",
      "striptags",
    ],
    dtsExternal: ["node:http"],
  }),
  ...rollupTypescript("client/index", {
    resolve: true,
    external: ["fflate/browser"],
    copy: [["client/styles", "client"]],
  }),
  ...rollupTypescript("client/noopModule"),
];

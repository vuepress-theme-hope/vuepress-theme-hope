import { bundle } from "../../scripts/rollup.js";

export default [
  ...bundle("node/index", {
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
  ...bundle(
    { base: "client", files: ["index", "noopModule"] },
    {
      resolve: true,
      external: ["fflate/browser"],
      copy: [["client/styles", "client"]],
    }
  ),
];

import { bundle } from "../../scripts/rollup.js";

export default [
  ...bundle("node/index", {
    resolve: true,
    external: ["cheerio", "execa", "gray-matter", "fflate/node", "striptags"],
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

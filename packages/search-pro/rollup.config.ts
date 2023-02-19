import { bundle } from "../../scripts/rollup.js";

export default [
  ...bundle("node/index", {
    external: ["cheerio", "chokidar", "vuepress-plugin-sass-palette"],
    dtsExternal: ["vuepress-shared"],
  }),
  ...bundle(
    { base: "client", files: ["components/SearchResult", "config"] },
    {
      external: ["body-scroll-lock", "vuepress-plugin-search-pro/result"],
      copy: [["client/styles", "client"]],
    }
  ),
];

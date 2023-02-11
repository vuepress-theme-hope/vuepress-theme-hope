import { rollupTypescript } from "../../scripts/rollup.js";

export default [
  ...rollupTypescript("node/index", {
    external: ["cheerio", "chokidar", "vuepress-plugin-sass-palette"],
    dtsExternal: ["vuepress-shared"],
  }),
  ...rollupTypescript("client/components/SearchResult", {
    external: ["body-scroll-lock"],
    copy: [["client/styles", "client"]],
  }),
  ...rollupTypescript("client/config", {
    external: ["vuepress-plugin-search-pro/result"],
    copy: [["client/styles", "client"]],
  }),
];

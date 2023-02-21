import { bundle } from "../../scripts/rollup.js";

export default [
  ...bundle("node/index", {
    external: ["cheerio", "chokidar"],
    dtsExternal: ["vuepress-shared"],
  }),
  ...bundle(
    {
      base: "client",
      files: ["components/SearchResult", "config", "worker/index"],
    },
    {
      external: ["body-scroll-lock", "vuepress-plugin-search-pro/result"],
      copy: [["client/styles", "client"]],
    }
  ),
  ...bundle("worker/index", {
    resolve: true,
    dts: false,
    external: [/^@internal\//],
    replace: {
      __VUEPRESS_SSR__: false,
    },
  }),
];

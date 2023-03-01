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
  ...bundle("worker/minify", {
    resolve: true,
    dts: false,
    external: [/^@internal\//],
    replace: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      __VUEPRESS_SSR__: false,
    },
  }),
  ...bundle("worker/original", {
    resolve: true,
    dts: false,
    replace: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      __VUEPRESS_SSR__: false,
    },
  }),
];

import { bundle } from "../../scripts/rollup.js";

export default [
  ...bundle("node/index", {
    external: ["cheerio", "chokidar", "minisearch"],
    dtsExternal: ["vuepress-shared"],
  }),
  ...bundle(
    {
      base: "client",
      files: ["components/SearchResult", "config", "index", "worker/index"],
    },
    {
      external: [
        "@internal/pagesComponents",
        "vuepress-plugin-search-pro/result",
      ],
      copy: [["client/styles", "client"]],
    }
  ),
  ...bundle("worker/index", {
    resolve: true,
    dts: false,
    external: [/^@internal\//, "minisearch"],
    replace: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      __VUEPRESS_SSR__: false,
    },
  }),
];

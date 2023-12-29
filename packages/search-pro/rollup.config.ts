import { rollupBundle } from "../../scripts/rollup.js";

export default [
  ...rollupBundle("node/index", {
    external: ["cheerio", "chokidar", "slimsearch"],
    dtsExternal: ["vuepress-shared"],
  }),
  ...rollupBundle(
    {
      base: "client",
      files: ["components/SearchResult", "config", "index", "worker/index"],
    },
    {
      external: [
        "@internal/pagesComponents",
        "slimsearch",
        "vuepress-plugin-search-pro/result",
      ],
      copy: [["client/styles", "client"]],
    },
  ),
  ...rollupBundle("worker/index", {
    resolve: true,
    dts: false,
    external: [/^@internal\//],
    replace: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      __VUEPRESS_SSR__: false,
    },
  }),
];

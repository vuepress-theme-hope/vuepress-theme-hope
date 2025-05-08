import { getDirname, path } from "vuepress/utils";

import { rollupBundle } from "../../scripts/rollup.js";

const __dirname = getDirname(import.meta.url);

export default [
  ...rollupBundle("node/index", {
    external: ["bcrypt-ts/node", "chokidar", "nodejs-jieba", "vuepress-shared"],
    moduleSideEffects: () => false,
  }),
  ...rollupBundle(
    {
      base: "client",
      target: "bundle",
      files: [
        "exports/base",
        "exports/blog",
        "exports/encrypt",
        "exports/noop",
        "blog",
        "index",
      ],
    },
    {
      alias: [
        {
          find: /^@theme-hope\/(.*)/,
          replacement: path.resolve(__dirname, "./src/client/$1.ts"),
        },
      ],
      replace: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        __IS_BUNDLED__: "true",
      },
      external: [
        "@vuepress/helper/noopComponent",
        "@vuepress/plugin-blog/client",
        "@vuepress/plugin-comment/pageview",
        "@vuepress/plugin-git/client",
        "@vuepress/plugin-reading-time/client",
        "@vuepress/plugin-theme-data/client",
        "bcrypt-ts/browser",
      ],
      moduleSideEffects: (id) =>
        id.endsWith(".css") || id.includes("runTimeCheck"),
    },
  ),
];

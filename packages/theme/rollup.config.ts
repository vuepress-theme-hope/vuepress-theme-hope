import { getDirname, path } from "vuepress/utils";

import { rollupBundle } from "../../scripts/rollup.js";

const __dirname = getDirname(import.meta.url);

export default [
  ...rollupBundle("node/index", {
    external: ["bcrypt-ts/node", "chokidar", "nodejs-jieba"],
    moduleSideEffects: () => false,
  }),
  ...rollupBundle(
    {
      base: "client",
      target: "bundle",
      files: ["export", "modules/blog/export", "modules/encrypt/export"],
    },
    {
      alias: [
        {
          find: /^@theme-hope\/(.*)/,
          replacement: path.resolve(__dirname, "./src/client/$1.ts"),
        },
      ],
      external: [
        "@vuepress/helper/noopComponent",
        "@vuepress/plugin-blog/client",
        "@vuepress/plugin-comment/pageview",
        "@vuepress/plugin-external-link-icon/client",
        "@vuepress/plugin-reading-time/client",
        "@vuepress/plugin-theme-data/client",
        "bcrypt-ts/browser",
        "body-scroll-lock",
        "vuepress-plugin-md-enhance/SlidePage",
        /\.jpg$/,
      ],
      dts: false,
      moduleSideEffects: (id) =>
        [
          "balloon-css/balloon.css",
          "vuepress-shared/client/styles/message.scss",
        ].includes(id),
    },
  ),
];

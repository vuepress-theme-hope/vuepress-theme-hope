import { bundle } from "../../scripts/rollup.js";

export default [
  ...bundle(
    {
      base: "node",
      files: ["index", "perf"],
    },
    {
      external: ["bcrypt-ts/node", "chokidar"],
      moduleSideEffects: () => false,
    }
  ),
  ...bundle(
    {
      base: "client",
      target: "perf",
      files: ["export", "modules/blog/export", "modules/encrypt/export"],
    },
    {
      alias: [
        {
          find: /^@theme-hope(.*)/,
          replacement: "./src/client/$1.ts",
        },
      ],
      external: [
        "@vuepress/plugin-external-link-icon/client",
        "@vuepress/plugin-theme-data/client",
        "bcrypt-ts/browser",
        "vuepress-plugin-blog2/client",
        "vuepress-plugin-comment2/pageview",
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
    }
  ),
];

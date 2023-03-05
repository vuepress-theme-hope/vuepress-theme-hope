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
      files: [
        "components/HopeIcon",
        "composables/index",
        "modules/blog/components/BloggerInfo",
        "modules/blog/composables/index",
        "modules/blog/layouts/BlogCategory",
        "modules/blog/layouts/BlogHome",
        "modules/blog/layouts/BlogType",
        "modules/blog/layouts/Timeline",
        "modules/encrypt/components/GlobalEncrypt",
        "modules/encrypt/components/LocalEncrypt",
        "modules/outlook/composables/index",
        "modules/sidebar/composables/index",
        "layouts/Layout",
        "layouts/NotFound",
        "layouts/Slide",
      ],
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

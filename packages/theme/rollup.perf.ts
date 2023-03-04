import { bundle } from "../../scripts/rollup.js";

export default [
  ...bundle("node/perf", {
    external: ["bcrypt-ts/node", "chokidar"],
  }),
  ...bundle(
    {
      base: "client",
      files: [
        "components/HopeIcon",
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
      dtsExternal: [
        "vuepress-plugin-blog2/client",
        "vuepress-plugin-md-enhance/SlidePage",
      ],
    }
  ),
];

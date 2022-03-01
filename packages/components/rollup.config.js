import { rollupTypescript } from "../../scripts/rollup";

export default [
  ...rollupTypescript("node/index", {
    external: [
      "@mr-hope/vuepress-shared",
      "@vuepress/utils",
      "lodash.debounce",
      "vue",
      "vuepress-plugin-reading-time2",
      "vuepress-plugin-sass-palette",
    ],
  }),
  ...rollupTypescript("client/appEnhance", {
    external: [
      "@vuepress/client",
      "@ArticleInfo",
      "@Badge",
      "@BreadCrumb",
      "@FullScreen",
      "@Pagination",
      "@TOC",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
    copy: [["client/styles", "client"]],
  }),
  ...rollupTypescript("client/components/ArticleInfo", {
    external: [
      "@mr-hope/vuepress-shared/lib/client",
      "@vuepress/client",
      "balloon-css/balloon.css",
      "vue",
      "vue-router",
      /\.scss$/,
    ],
    dtsExternal: ["balloon-css/balloon.css", /\.scss$/],
  }),
  ...rollupTypescript("client/components/Badge", {
    external: ["vue", /\.scss$/],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/BreadCrumb", {
    external: [
      "@mr-hope/vuepress-shared/lib/client",
      "@vuepress/client",
      "@vuepress/shared",
      "vue",
      "vue-router",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/FullScreen", {
    external: [
      "@mr-hope/vuepress-shared/lib/client",
      "@vueuse/core",
      "vue",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/Pagination", {
    external: [
      "@mr-hope/vuepress-shared/lib/client",
      "vue",
      "vue-router",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/TOC", {
    external: [
      "@mr-hope/vuepress-shared/lib/client",
      "@vuepress/client",
      "vue",
      "vue-router",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/root-components/BackToTop", {
    external: [
      "@mr-hope/vuepress-shared/lib/client",
      "@vuepress/client",
      "@vuepress/plugin-theme-data/lib/client",
      "lodash.debounce",
      "vue",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
];

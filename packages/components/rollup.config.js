import { rollupTypescript, rollupVue } from "../../scripts/rollup";

export default [
  ...rollupTypescript("node/index", {
    external: [
      "@mr-hope/vuepress-shared",
      "@vuepress/utils",
      "lodash.debounce",
      "vue",
      "vuepress-plugin-sass-palette",
    ],
  }),
  ...rollupVue("client/appEnhance.ts", {
    external: ["@vuepress/client", /\.scss$/],
    dtsExternal: [/\.scss$/],
    copy: [["client/styles", "client"]],
  }),
  ...rollupVue("client/components/Badge.ts", {
    external: ["vue", /\.scss$/],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupVue("client/components/BreadCrumb.ts", {
    external: ["@vuepress/client", "vue", "vue-router", /\.scss$/],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupVue("client/components/PageInfo.ts", {
    external: [
      "@mr-hope/vuepress-shared/lib/client",
      "@vuepress/client",
      "balloon-css/balloon.css",
      "vue",
      "vue-router",
      /\.scss$/,
    ],
    dtsExternal: ["balloon-css", /\.scss$/],
  }),
  ...rollupVue("client/components/Pagination.vue", {
    external: ["@mr-hope/vuepress-shared/lib/client", "vue", /\.scss$/],
  }),
  ...rollupVue("client/components/ScreenFull.ts", {
    external: ["screenfull", "vue"],
  }),
  ...rollupVue("client/root-components/BackToTop.ts", {
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

import { rollupTypescript, rollupVue } from "../../script/rollup";

export default [
  ...rollupTypescript("node/index", {
    external: [
      "@mr-hope/vuepress-shared",
      "@vuepress/utils",
      "lodash.debounce",
      "vue",
    ],
  }),
  ...rollupVue("client/appEnhance.ts", {
    external: [
      "@mr-hope/vuepress-shared/client",
      "@mr-hope/vuepress-shared/styles/config/index.scss",
      "@vuepress/client",
      "@vuepress/plugin-theme-data/lib/client",
      "vue",
      "vue-router",
      "screenfull",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
    copy: [["client/styles", "client"]],
  }),
  ...rollupVue("client/root-components/BackToTop.ts", {
    external: [
      "@mr-hope/vuepress-shared/client",
      "@vuepress/client",
      "@vuepress/plugin-theme-data/lib/client",
      "lodash.debounce",
      "vue",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
];

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
    external: [
      "@mr-hope/vuepress-shared/lib/client",
      "@mr-hope/vuepress-shared/styles/config/index.scss",
      "@vuepress/client",
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

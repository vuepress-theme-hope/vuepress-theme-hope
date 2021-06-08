import { rollupTypescript, rollupVue } from "../../scripts/rollup";

export default [
  ...rollupTypescript("node/index", {
    output: { format: "cjs" },
    external: ["@vuepress/utils"],
  }),
  ...rollupVue("client/appEnhance.ts", {
    copy: [["client/styles", "client"]],
    external: [
      "@vuepress/client",
      "@vuepress/plugin-theme-data/lib/client",
      "@vuepress/shared",
      "vue",
      "vue-router",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupVue("client/appSetup.ts", {
    external: [
      "@vuepress/client",
      "@vuepress/plugin-theme-data/lib/client",
      "@vuepress/shared",
      "vue",
      "vue-router",
    ],
  }),
  ...rollupVue("client/layouts/Layout.vue", {
    external: [
      "@mr-hope/vuepress-shared/client",
      "@vuepress/client",
      "@vuepress/plugin-theme-data/lib/client",
      "@vuepress/shared",
      "vue",
      "vue-router",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupVue("client/layouts/404.vue", {
    external: [
      "@vuepress/client",
      "@vuepress/plugin-theme-data/lib/client",
      "@vuepress/shared",
      "vue",
      "vue-router",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
];

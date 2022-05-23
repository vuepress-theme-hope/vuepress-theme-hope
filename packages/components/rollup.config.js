import { rollupTypescript } from "../../scripts/rollup";

export default [
  ...rollupTypescript("node/index", {
    external: [
      "vuepress-shared",
      "@vuepress/shared",
      "@vuepress/utils",
      "vuepress-plugin-reading-time2",
      "vuepress-plugin-sass-palette",
    ],
    copy: [["client/styles", "client"]],
  }),
  ...rollupTypescript("client/components/Badge", {
    external: ["vue", /\.scss$/],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/BackToTop", {
    external: [
      "vuepress-shared/lib/client",
      "@vuepress/client",
      "@vuepress/plugin-theme-data/lib/client",
      "@vueuse/core",
      "ts-debounce",
      "vue",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/CodePen", {
    external: ["@vueuse/core", "vue"],
  }),
  ...rollupTypescript("client/components/FontIcon", {
    external: ["vue", /\.scss$/],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/PDF", {
    external: ["@vuepress/client", "vue", /\.scss$/],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/composables/index", {
    external: ["@vueuse/core"],
  }),
];

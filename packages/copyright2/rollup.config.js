import { rollupTypescript } from "../../scripts/rollup.js";

export default [
  ...rollupTypescript("node/index", {
    external: [
      "@vuepress/core",
      "@vuepress/shared",
      "@vuepress/utils",
      "vuepress-shared/node",
    ],
    dtsExternal: ["vuepress-shared"],
  }),
  ...rollupTypescript("client/config", {
    external: ["@vuepress/client", "@vueuse/core", "vue", /\.scss$/],
  }),
];

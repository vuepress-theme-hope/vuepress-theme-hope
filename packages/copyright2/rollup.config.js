import { rollupTypescript } from "../../scripts/rollup";

export default [
  ...rollupTypescript("node/index", {
    external: [
      "vuepress-shared",
      "@vuepress/core",
      "@vuepress/shared",
      "@vuepress/utils",
    ],
  }),
  ...rollupTypescript("client/config", {
    external: ["@vuepress/client", "@vueuse/core", "vue", /\.scss$/],
  }),
];

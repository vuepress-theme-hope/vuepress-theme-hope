import { rollupTypescript } from "../../scripts/rollup";

export default [
  ...rollupTypescript("node/index", {
    external: [
      "vuepress-shared",
      "@vuepress/core",
      "@vuepress/shared",
      "chokidar",
    ],
  }),
  ...rollupTypescript("client/index", {
    external: [
      /^@temp/,
      "@vuepress/client",
      "@vuepress/shared",
      "vue",
      "vue-router",
      "vuepress-shared/lib/client",
    ],
  }),
];

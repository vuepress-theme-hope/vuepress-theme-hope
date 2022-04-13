import { rollupTypescript } from "../../scripts/rollup";

export default [
  ...rollupTypescript("node/index", {
    external: [
      "@mr-hope/vuepress-shared",
      "@vuepress/core",
      "@vuepress/shared",
      "chokidar",
    ],
  }),
  ...rollupTypescript("client/index", {
    external: [
      "@mr-hope/vuepress-shared/lib/client",
      "@vuepress/client",
      "@vuepress/shared",
      "vue",
      "vue-router",
      /^@temp/,
    ],
  }),
];

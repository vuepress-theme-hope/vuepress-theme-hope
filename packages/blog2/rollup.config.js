import { rollupTypescript } from "../../scripts/rollup.js";

export default [
  ...rollupTypescript("node/index", {
    external: [
      "vuepress-shared",
      "@vuepress/core",
      "@vuepress/shared",
      "@vuepress/utils",
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
    dtsExternal: [/^@temp/],
  }),
];

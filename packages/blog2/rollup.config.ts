import { rollupTypescript } from "../../scripts/rollup.js";

export default [
  ...rollupTypescript("node/index", {
    external: [
      "@vuepress/core",
      "@vuepress/shared",
      "@vuepress/utils",
      "chokidar",
      "vuepress-shared/node",
    ],
    dtsExternal: ["vuepress-shared", "vuepress-shared/node"],
  }),
  ...rollupTypescript("client/index", {
    external: [
      /^@temp/,
      "@vuepress/client",
      "@vuepress/shared",
      "vue",
      "vue-router",
      "vuepress-shared/client",
    ],
    dtsExternal: [/^@temp/],
  }),
];

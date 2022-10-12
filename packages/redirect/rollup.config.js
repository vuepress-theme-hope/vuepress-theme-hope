import { rollupTypescript } from "../../scripts/rollup.js";

export default [
  ...rollupTypescript("cli/index", {
    dts: false,
    external: [
      "node:module",
      "@vuepress/cli",
      "@vuepress/core",
      "@vuepress/shared",
      "@vuepress/utils",
      "cac",
    ],
    preserveShebang: true,
  }),
  ...rollupTypescript("node/index", {
    external: [
      "vuepress-shared",
      "@vuepress/core",
      "@vuepress/shared",
      "@vuepress/utils",
    ],
  }),
];

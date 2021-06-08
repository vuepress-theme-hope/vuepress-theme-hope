import { rollupTypescript } from "../../scripts/rollup";

export default [
  ...rollupTypescript("node/index", { resolve: true }),
  ...rollupTypescript("client/index", {
    resolve: true,
    external: [
      "@vuepress/client",
      "@vuepress/plugin-theme-data/lib/client",
      "vue",
    ],
  }),
];

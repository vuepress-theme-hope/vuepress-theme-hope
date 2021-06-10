import { rollupTypescript } from "../../scripts/rollup";

export default [
  ...rollupTypescript("node/index", {
    resolve: true,
    external: ["chalk", "ora"],
  }),
  ...rollupTypescript("client/index", {
    resolve: true,
    external: [
      "@vuepress/client",
      "@vuepress/plugin-theme-data/lib/client",
      "chalk",
      "ora",
      "vue",
    ],
  }),
  ...rollupTypescript("client/noopModule", {
    external: ["vue"],
  }),
];

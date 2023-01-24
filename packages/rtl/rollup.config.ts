import { rollupTypescript } from "../../scripts/rollup.js";

export default [
  ...rollupTypescript("node/index", {
    external: ["@vuepress/shared", "@vuepress/utils"],
    dtsExternal: ["@vuepress/core"],
  }),
  ...rollupTypescript("client/config", {
    external: ["@vuepress/client", "vue"],
  }),
];

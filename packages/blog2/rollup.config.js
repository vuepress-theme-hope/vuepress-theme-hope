import { rollupTypescript } from "../../scripts/rollup";

export default [
  ...rollupTypescript("node/index", {
    external: ["@mr-hope/vuepress-shared", "@vuepress/core"],
  }),
  ...rollupTypescript("client/index", {
    external: ["@vuepress/client", "vue", "vue-router", /^@temp/],
  }),
];

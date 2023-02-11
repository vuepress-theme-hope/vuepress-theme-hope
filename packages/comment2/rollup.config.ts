import { rollupTypescript } from "../../scripts/rollup.js";

export default [
  ...rollupTypescript("node/index", {
    external: ["vuepress-plugin-sass-palette"],
    dtsExternal: ["vuepress-shared"],
  }),
  ...rollupTypescript("client/config", {
    external: ["vuepress-plugin-comment2/provider"],

    copy: [["client/styles", "client"]],
  }),
  ...rollupTypescript("client/components/Artalk", {
    external: ["artalk"],
  }),
  ...rollupTypescript("client/components/Giscus", {
    external: ["giscus"],
  }),
  ...rollupTypescript("client/components/Twikoo", {
    external: ["twikoo"],
  }),
  ...rollupTypescript("client/components/Waline", {
    external: [
      "@waline/client/dist/component.mjs",
      "@waline/client/dist/pageview.mjs",
      "autosize",
      "marked",
    ],
  }),
  ...rollupTypescript("client/pageview", {
    external: ["@waline/client/dist/pageview.mjs"],
  }),
];

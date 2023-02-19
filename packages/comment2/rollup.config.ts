import { bundle } from "../../scripts/rollup.js";

export default [
  ...bundle("node/index", {
    external: ["vuepress-plugin-sass-palette"],
    dtsExternal: ["vuepress-shared"],
  }),
  ...bundle("client/config", {
    external: ["vuepress-plugin-comment2/provider"],

    copy: [["client/styles", "client"]],
  }),
  ...bundle("client/components/Artalk", {
    external: ["artalk"],
  }),
  ...bundle("client/components/Giscus", {
    external: ["giscus"],
  }),
  ...bundle("client/components/Twikoo", {
    external: ["twikoo"],
  }),
  ...bundle("client/components/Waline", {
    external: [
      "@waline/client/dist/component.mjs",
      "@waline/client/dist/pageview.mjs",
      "autosize",
      "marked",
    ],
  }),
  ...bundle("client/pageview", {
    external: ["@waline/client/dist/pageview.mjs"],
  }),
];

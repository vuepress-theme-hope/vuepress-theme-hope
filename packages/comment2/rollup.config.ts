import { rollupTypescript } from "../../scripts/rollup.js";

export default [
  ...rollupTypescript("node/index", {
    external: [
      "@vuepress/utils",
      "vuepress-plugin-sass-palette",
      "vuepress-shared/node",
    ],
    dtsExternal: ["vuepress-shared"],
  }),
  ...rollupTypescript("client/config", {
    external: [
      "@vuepress/client",
      "vue",
      "vue-router",
      "vuepress-plugin-comment2/provider",
      "vuepress-shared/client",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
    copy: [["client/styles", "client"]],
  }),
  ...rollupTypescript("client/components/Giscus", {
    external: ["@vuepress/client", "giscus", "vue", "vue-router", /\.scss$/],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/Twikoo", {
    external: ["@vuepress/client", "twikoo", "vue", "vue-router", /\.scss$/],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/Waline", {
    external: [
      "@vuepress/client",
      "@waline/client/dist/component.mjs",
      "@waline/client/dist/pageview.mjs",
      "autosize",
      "marked",
      "vue",
      "vue-router",
      "vuepress-shared/client",
      /\.s?css$/,
    ],
    dtsExternal: [/\.s?css$/],
  }),
  ...rollupTypescript("client/pageview", {
    external: ["@waline/client/dist/pageview.mjs"],
  }),
];

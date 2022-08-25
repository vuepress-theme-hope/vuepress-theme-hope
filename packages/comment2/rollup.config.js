import { rollupTypescript } from "../../scripts/rollup";

export default [
  ...rollupTypescript("node/index", {
    external: [
      "vuepress-shared",
      "@vuepress/utils",
      "vuepress-plugin-sass-palette",
    ],
  }),
  ...rollupTypescript("client/config", {
    external: [
      "@CommentProvider",
      "@vuepress/client",
      "vue",
      "vue-router",
      "vuepress-shared/lib/client",
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
      "@waline/client/dist/component",
      "@waline/client/dist/pageview",
      "autosize",
      "marked",
      "vue",
      "vue-router",
      "vuepress-shared/lib/client",
      /\.s?css$/,
    ],
    dtsExternal: [/\.s?css$/],
  }),
];

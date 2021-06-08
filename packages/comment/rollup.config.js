import { rollupTypescript } from "../../script/rollup";

export default [
  ...rollupTypescript("node/index", {
    external: ["@mr-hope/vuepress-shared", "@vuepress/utils"],
  }),
  ...rollupTypescript("client/appEnhance", {
    external: [
      "@mr-hope/vuepress-shared/client",
      "@vuepress/client",
      "balloon-css",
      "vue",
      "vue-router",
      "vuepress-plugin-reading-time2/client/i18n",
      "@Waline",
      /\.scss$/,
    ],
    dtsExternal: ["balloon-css", /\.scss$/],
    copy: [["client/styles", "client"]],
  }),
  ...rollupTypescript("client/components/Waline", {
    external: [
      "@mr-hope/vuepress-shared/client",
      "@vuepress/client",
      "@waline/client",
      "vue",
      "vue-router",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
];

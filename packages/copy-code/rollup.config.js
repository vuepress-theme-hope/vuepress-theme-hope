import { rollupTypescript } from "../../script/rollup";

export default [
  ...rollupTypescript("node/index", {
    external: ["@mr-hope/vuepress-shared", "@vuepress/utils", "vue"],
  }),
  ...rollupTypescript("client/appSetup", {
    external: [
      "@mr-hope/vuepress-shared/styles/config/index.scss",
      "@vuepress/client",
      "balloon-css",
      "vue",
      /\.scss$/,
    ],
    dtsExternal: ["balloon-css", /\.scss$/],
    copy: [["client/styles", "client"]],
  }),
];

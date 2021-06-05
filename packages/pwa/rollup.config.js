import { rollupTypescript, rollupVue } from "../../script/rollup";

export default [
  ...rollupTypescript("node/index", {
    external: [
      "@mr-hope/vuepress-shared",
      "@vuepress/utils",
      "chalk",
      "fs-extra",
      "workbox-build",
      "path",
    ],
  }),
  ...rollupTypescript("client/appSetup", {
    resolve: true,
    external: ["@vuepress/client", "vue", /\.scss$/],
    dtsExternal: [/\.scss$/],
    copy: [["client/styles", "client"]],
  }),
  ...rollupVue("client/global-components/PWAInstall.ts", {
    resolve: true,
    external: [
      "@mr-hope/vuepress-shared/client",
      "@vuepress/client",
      "vue",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/global-components/SWUpdatePopup", {
    external: [
      "@mr-hope/vuepress-shared/client",
      "@vuepress/client",
      "vue",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
];

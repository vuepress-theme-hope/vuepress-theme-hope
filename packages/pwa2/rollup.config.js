import { rollupTypescript } from "../../scripts/rollup";

export default [
  ...rollupTypescript("node/index", {
    external: [
      "@mr-hope/vuepress-shared",
      "@vuepress/shared",
      "@vuepress/utils",
      "workbox-build",
      "vuepress-plugin-sass-palette",
    ],
  }),
  ...rollupTypescript("client/appSetup", {
    resolve: true,
    external: ["@vuepress/client", "vue", /\.scss$/],
    dtsExternal: [/\.scss$/],
    copy: [["client/styles", "client"]],
  }),
  ...rollupTypescript("client/global-components/PWAInstall", {
    resolve: true,
    external: [
      "@mr-hope/vuepress-shared/lib/client",
      "@vuepress/client",
      "vue",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/global-components/SWUpdatePopup", {
    external: [
      "@mr-hope/vuepress-shared/lib/client",
      "@vuepress/client",
      "register-service-worker",
      "vue",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/global-components/SWHintPopup", {
    external: [
      "@mr-hope/vuepress-shared/lib/client",
      "@vuepress/client",
      "register-service-worker",
      "vue",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
];

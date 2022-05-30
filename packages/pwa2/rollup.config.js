import { rollupTypescript } from "../../scripts/rollup";

export default [
  ...rollupTypescript("node/index", {
    external: [
      "vuepress-shared",
      "@vuepress/shared",
      "@vuepress/utils",
      "workbox-build",
      "vuepress-plugin-sass-palette",
    ],
  }),
  ...rollupTypescript("client/components/PWAInstall", {
    resolve: true,
    external: [
      "@vuepress/client",
      "@vueuse/core",
      "vue",
      "vuepress-shared/lib/client",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/SWUpdatePopup", {
    external: [
      "@vuepress/client",
      "register-service-worker",
      "vue",
      "vuepress-shared/lib/client",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/SWHintPopup", {
    external: [
      "@vuepress/client",
      "register-service-worker",
      "vue",
      "vuepress-shared/lib/client",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/composables/setup", {
    resolve: true,
    external: ["@vuepress/client", "mitt", "vue", /\.scss$/],
    dtsExternal: [/\.scss$/],
    copy: [["client/styles", "client"]],
  }),
];

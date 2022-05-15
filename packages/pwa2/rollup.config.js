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
  ...rollupTypescript("client/components/PWAInstall", {
    resolve: true,
    external: [
      "@mr-hope/vuepress-shared/lib/client",
      "@vuepress/client",
      "@vueuse/core",
      "vue",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/SWUpdatePopup", {
    external: [
      "@mr-hope/vuepress-shared/lib/client",
      "@vuepress/client",
      "register-service-worker",
      "vue",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/SWHintPopup", {
    external: [
      "@mr-hope/vuepress-shared/lib/client",
      "@vuepress/client",
      "register-service-worker",
      "vue",
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

import { rollupTypescript } from "../../scripts/rollup.js";

export default [
  ...rollupTypescript("node/index", {
    external: ["workbox-build", "vuepress-plugin-sass-palette"],
    dtsExternal: ["vuepress-shared"],
  }),
  ...rollupTypescript("client/components/PWAInstall", {
    external: ["mitt"],
  }),
  ...rollupTypescript("client/components/SWUpdatePopup", {
    external: ["mitt", "register-service-worker"],
  }),
  ...rollupTypescript("client/components/SWHintPopup", {
    external: ["mitt", "register-service-worker"],
  }),
  ...rollupTypescript("client/composables/setup", {
    external: ["mitt", "register-service-worker"],
    copy: [["client/styles", "client"]],
  }),
];

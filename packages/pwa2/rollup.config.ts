import { bundle } from "../../scripts/rollup.js";

export default [
  ...bundle("node/index", {
    external: ["workbox-build", "vuepress-plugin-sass-palette"],
    dtsExternal: ["vuepress-shared"],
  }),
  ...bundle(
    {
      base: "client",
      files: [
        "components/PWAInstall",
        "components/SWUpdatePopup",
        "components/SWHintPopup",
        "composables/setup",
      ],
    },
    {
      external: ["mitt", "register-service-worker"],
      copy: [["client/styles", "client"]],
    }
  ),
];

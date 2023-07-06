import { bundle } from "../../scripts/rollup.js";

export default [
  ...bundle("node/index", {
    external: ["workbox-build"],
    dtsExternal: ["vuepress-shared"],
  }),
  ...bundle(
    {
      base: "client",
      files: [
        "components/SWUpdatePopup",
        "components/SWHintPopup",
        "composables/setup",
        "index",
      ],
    },
    {
      external: ["mitt", "register-service-worker"],
      copy: [["client/styles", "client"]],
    },
  ),
];

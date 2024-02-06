import { rollupBundle } from "../../scripts/rollup.js";

export default [
  ...rollupBundle("node/index", {
    external: ["workbox-build"],
    dtsExternal: ["vuepress-shared"],
  }),
  ...rollupBundle(
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

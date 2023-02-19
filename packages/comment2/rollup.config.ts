import { bundle } from "../../scripts/rollup.js";

export default [
  ...bundle("node/index", {
    dtsExternal: ["vuepress-shared"],
  }),
  ...bundle(
    {
      base: "client",
      files: [
        "components/Artalk",
        "components/Giscus",
        "components/Twikoo",
        "components/Waline",
        "config",
        "pageview",
      ],
    },
    {
      external: [
        "@waline/client/dist/component.mjs",
        "@waline/client/dist/pageview.mjs",
        "artalk",
        "giscus",
        "twikoo",
        "vuepress-plugin-comment2/provider",
      ],
      copy: [["client/styles", "client"]],
    }
  ),
];

import { rollupBundle } from "../../scripts/rollup.js";

export default [
  ...rollupBundle("node/index", {
    dtsExternal: ["vuepress-shared"],
  }),
  ...rollupBundle(
    {
      base: "client",
      files: [
        "components/Giscus",
        "components/Twikoo",
        "components/Waline",
        "config",
        "pageview",
        "index",
      ],
    },
    {
      external: [
        "@waline/client/component",
        "@waline/client/pageview",
        "giscus",
        "twikoo",
        "vuepress-plugin-comment2/provider",
      ],
      copy: [["client/styles", "client"]],
    },
  ),
];

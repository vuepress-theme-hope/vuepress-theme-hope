import { rollupTypescript } from "../../scripts/rollup";

export default [
  ...rollupTypescript("node/index", {
    external: [
      "vuepress-shared",
      "@vuepress/shared",
      "@vuepress/utils",
      "vuepress-plugin-reading-time2",
      "vuepress-plugin-sass-palette",
    ],
    copy: [["client/styles", "client"]],
  }),
  ...rollupTypescript("client/components/Badge", {
    external: ["vue", /\.scss$/],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/BiliBili", {
    external: ["vue", /\.scss$/],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/BackToTop", {
    external: [
      "@vuepress/client",
      "@vueuse/core",
      "vue",
      "vuepress-shared/lib/client",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/CodePen", {
    external: ["@vueuse/core", "vue", /\.scss$/],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/FontIcon", {
    external: ["vue", /\.scss$/],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/PDF", {
    external: [
      "@vuepress/client",
      "@vuepress/shared",
      "@vueuse/core",
      "vue",
      "vuepress-shared/lib/client",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/StackBlitz", {
    external: ["@vueuse/core", "vue", /\.scss$/],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/YouTube", {
    external: ["@vueuse/core", "@vuepress/client", "vue", /\.scss$/],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/VideoPlayer", {
    external: ["@vueuse/core", "vue", /\.scss$/],
    dtsExternal: ["@vueuse/core", /\.scss$/],
  }),
  ...rollupTypescript("client/vueuse", {
    external: ["@vueuse/core"],
  }),
];

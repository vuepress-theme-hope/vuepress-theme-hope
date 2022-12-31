import { rollupTypescript } from "../../scripts/rollup.js";

export default [
  ...rollupTypescript("node/index", {
    external: [
      "@vuepress/shared",
      "@vuepress/utils",
      "vuepress-plugin-reading-time2",
      "vuepress-plugin-sass-palette",
      "vuepress-shared/node",
    ],
    copy: [["client/styles", "client"]],
  }),
  ...rollupTypescript("client/components/AudioPlayer", {
    external: [
      "@vuepress/client",
      "@vuepress/shared",
      "plyr",
      "vue",
      "vuepress-shared/client",
      /\.s?css$/,
    ],
    dtsExternal: [/\.s?css$/],
  }),
  ...rollupTypescript("client/components/Badge", {
    external: ["vue", /\.scss$/],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/BiliBili", {
    external: ["@vueuse/core", "vue", "vuepress-shared/client", /\.scss$/],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/BackToTop", {
    external: [
      "@vuepress/client",
      "@vueuse/core",
      "vue",
      "vuepress-shared/client",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/Catalog", {
    external: ["vue", "vue-router", /\.scss$/],
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
  ...rollupTypescript("client/components/Notice", {
    external: ["vue", "vue-router", "vuepress-shared/client", /\.scss$/],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/components/PDF", {
    external: [
      "@vuepress/client",
      "@vuepress/shared",
      "@vueuse/core",
      "vue",
      "vuepress-shared/client",
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
    external: [
      "@vuepress/client",
      "@vuepress/shared",
      "@vueuse/core",
      "plyr",
      "vue",
      "vuepress-shared/client",
      /\.s?css$/,
    ],
    dtsExternal: ["@vueuse/core", /\.s?css$/],
  }),
  ...rollupTypescript("client/shared", {
    external: ["vuepress-shared/client"],
    dtsExternal: ["vuepress-shared/client"],
  }),
  ...rollupTypescript("client/vueuse", {
    external: ["@vueuse/core"],
    dtsExternal: ["@vueuse/core"],
  }),
];

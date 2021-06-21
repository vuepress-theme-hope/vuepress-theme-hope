import { rollupTypescript, rollupVue } from "../../scripts/rollup";

export default [
  ...rollupTypescript("node/index", {
    external: ["@vuepress/utils", "vuepress-plugin-sass-palette"],
  }),

  ...rollupVue("client/components/navbar/Navbar.vue", {
    copy: [["client/components/navbar/styles", "client/components/navbar"]],
    external: [
      "@mr-hope/vuepress-shared/client",
      "@vuepress/client",
      "@vuepress/plugin-theme-data/lib/client",
      "@vuepress/shared",
      "vue",
      "vue-router",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupVue("client/components/sidebar/Sidebar.vue", {
    copy: [["client/components/sidebar/styles", "client/components/sidebar"]],
    external: [
      "@mr-hope/vuepress-shared/client",
      "@vuepress/client",
      "@vuepress/plugin-theme-data/lib/client",
      "@vuepress/shared",
      "vue",
      "vue-router",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupVue("client/components/Common.ts", {
    external: [
      "@Navbar",
      "@Sidebar",
      "@mr-hope/vuepress-shared/client",
      "@vuepress/client",
      "@vuepress/plugin-theme-data/lib/client",
      "@vuepress/shared",
      "lodash.throttle",
      "vue",
      "vue-router",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupVue("client/layouts/Layout.ts", {
    external: [
      "@Common",
      "@mr-hope/vuepress-shared/client",
      "@vuepress/client",
      "@vuepress/plugin-theme-data/lib/client",
      "@vuepress/shared",
      "vue",
      "vue-router",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupVue("client/layouts/Layout.ts", {
    external: [
      "@Common",
      "@mr-hope/vuepress-shared/client",
      "@vuepress/client",
      "@vuepress/plugin-theme-data/lib/client",
      "@vuepress/shared",
      "vue",
      "vue-router",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupVue("client/layouts/404.ts", {
    external: [
      "@Common",
      "@mr-hope/vuepress-shared/client",
      "@vuepress/client",
      "@vuepress/plugin-theme-data/lib/client",
      "@vuepress/shared",
      "vue",
      "vue-router",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/layouts/Slide", {
    external: ["vuepress-plugin-md-enhance/client/SlidePage", "vue"],
  }),
  ...rollupTypescript("client/appEnhance", {
    copy: [["client/styles", "client"]],
    external: [
      "@mr-hope/vuepress-shared/client",
      "@vuepress/client",
      "@vuepress/plugin-theme-data/lib/client",
      "@vuepress/shared",
      "vue",
      "vue-router",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupTypescript("client/appSetup", {
    external: [
      "@mr-hope/vuepress-shared/client",
      "@vuepress/client",
      "@vuepress/plugin-theme-data/lib/client",
      "@vuepress/shared",
      "vue",
      "vue-router",
    ],
  }),
];

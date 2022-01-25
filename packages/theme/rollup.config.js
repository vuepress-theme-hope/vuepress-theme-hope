import { rollupTypescript, rollupVue } from "../../scripts/rollup";

export default [
  ...rollupTypescript("node/index", {
    external: [
      "@mr-hope/vuepress-shared",
      "@mr-hope/vuepress-plugin-components",
      "@vuepress/utils",
      "vuepress-plugin-comment2",
      "vuepress-plugin-copy-code2",
      "vuepress-plugin-sass-palette",
    ],
  }),

  ...rollupVue("client/components/navbar/Navbar.ts", {
    copy: [["client/components/navbar/styles", "client/components/navbar"]],
    external: [
      "@mr-hope/vuepress-shared/lib/client",
      "@vuepress/client",
      "@vuepress/plugin-external-link-icon/lib/client",
      "@vuepress/plugin-theme-data/lib/client",
      "@vuepress/shared",
      "vue",
      "vue-router",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupVue("client/components/sidebar/Sidebar.ts", {
    copy: [["client/components/sidebar/styles", "client/components/sidebar"]],
    external: [
      "@mr-hope/vuepress-shared/lib/client",
      "@vuepress/client",
      "@vuepress/plugin-external-link-icon/lib/client",
      "@vuepress/plugin-theme-data/lib/client",
      "@vuepress/shared",
      "vue",
      "vue-router",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),
  ...rollupVue("client/components/CommonWrapper.ts", {
    external: [
      "@Navbar",
      "@Sidebar",
      "@mr-hope/vuepress-shared/lib/client",
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
      "@CommonWrapper",
      "@mr-hope/vuepress-shared/lib/client",
      "@vuepress/client",
      "@vuepress/plugin-external-link-icon/lib/client",
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
      "@CommonWrapper",
      "@mr-hope/vuepress-shared/lib/client",
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
    external: ["vuepress-plugin-md-enhance/lib/client/SlidePage", "vue"],
  }),
  ...rollupTypescript("client/appEnhance", {
    copy: [["client/styles", "client"]],
    external: [
      "@mr-hope/vuepress-shared/lib/client",
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
      "@mr-hope/vuepress-shared/lib/client",
      "@vuepress/client",
      "@vuepress/plugin-external-link-icon/lib/client",
      "@vuepress/plugin-theme-data/lib/client",
      "@vuepress/shared",
      "vue",
      "vue-router",
    ],
  }),
];

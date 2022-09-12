import { pwa, theme } from "docs-shared";
import { enNavbarConfig, zhNavbarConfig } from "./navbar.js";
import { enSidebarConfig, zhSidebarConfig } from "./sidebar.js";

export default theme("md-enhance", {
  locales: {
    "/": {
      navbar: enNavbarConfig,
      sidebar: enSidebarConfig,
    },

    "/zh/": {
      navbar: zhNavbarConfig,
      sidebar: zhSidebarConfig,
    },
  },

  plugins: {
    mdEnhance: {
      enableAll: true,
      playground: {
        presets: ["ts", "vue"],
      },
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
    },

    pwa: pwa({
      name: "vuepress-plugin-md-enhance",
      shortName: "VuePress2 Markdown Enhance plugin",
      guide: "/guide/",
    }),
  },
});

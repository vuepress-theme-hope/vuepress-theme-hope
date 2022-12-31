import { pwa, theme } from "docs-shared";

export default theme("blog2", {
  locales: {
    "/": {
      navbar: ["/", "/guide", "/config", "/demo"],
      sidebar: false,
    },
    "/zh/": {
      navbar: ["/zh/", "/zh/guide", "/zh/config", "/zh/demo"],
      sidebar: false,
    },
  },

  plugins: {
    mdEnhance: {
      codetabs: true,
    },

    pwa: pwa({
      name: "vuepress-plugin-auto-catalog",
      shortName: "Auto Catalog",
    }),
  },
});

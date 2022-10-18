import { pwa, theme } from "docs-shared";

// @ts-ignore
export default theme("search-pro", {
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
      name: "vuepress-plugin-search-pro",
      shortName: "VuePress2 Search plugin",
    }),
  },
});

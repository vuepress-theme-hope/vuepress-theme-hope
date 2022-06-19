import { pwa, theme } from "docs-shared";

export default theme("lightgallery", {
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

    photoSwipe: false,

    pwa: pwa({
      name: "vuepress-plugin-lightgallery",
      shortName: "VuePress2 lightgallery plugin",
    }),
  },
});

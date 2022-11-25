import { pwa, theme } from "docs-shared";

export default theme("remove-pwa", {
  locales: {
    "/": {
      navbar: ["/", "/guide", "/config"],

      sidebar: false,
    },
    "/zh/": {
      navbar: ["/zh/", "/zh/guide", "/zh/config"],

      sidebar: false,
    },
  },

  plugins: {
    mdEnhance: {
      codetabs: true,
      container: true,
    },

    pwa: pwa({
      name: "vuepress-plugin-remove-pwa",
      shortName: "VuePress2 Remove PWA plugin",
    }),
  },
});

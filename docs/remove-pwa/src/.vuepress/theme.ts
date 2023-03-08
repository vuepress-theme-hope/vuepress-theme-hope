import { theme } from "docs-shared";

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
    },
  },
});

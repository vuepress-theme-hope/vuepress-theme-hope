import { theme } from "docs-shared";

export default theme("remove-pwa", {
  locales: {
    "/": {
      navbar: [],

      sidebar: false,
    },
    "/zh/": {
      navbar: [],

      sidebar: false,
    },
  },

  plugins: {
    mdEnhance: {
      codetabs: true,
    },
  },
});

import { theme } from "docs-shared";

// the theme wrapper is located in <root>/docs-shared/src/theme-wrapper.ts
export default theme("rtl", {
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
      imgMark: true,
    },
  },
});

import { theme } from "docs-shared";

// the theme wrapper is located in <root>/docs-shared/src/theme-wrapper.ts
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
      imgMark: true,
    },
  },
});

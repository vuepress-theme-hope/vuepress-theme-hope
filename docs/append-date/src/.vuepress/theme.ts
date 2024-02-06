import { theme } from "docs-shared";

// The theme wrapper is located in <root>/docs-shared/src/theme-wrapper.ts
export default theme("append-date", {
  locales: {
    "/": {
      sidebar: false,
    },
    "/zh/": {
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

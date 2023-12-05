import { theme } from "docs-shared";

// the theme wrapper is located in <root>/docs-shared/src/theme-wrapper.ts
export default theme("auto-catalog", {
  locales: {
    "/": {
      navbar: ["/", "/guide", "/config", "/migration", "/demo"],
      sidebar: false,
    },
    "/zh/": {
      navbar: ["/zh/", "/zh/guide", "/zh/config", "/zh/migration", "/zh/demo"],
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

import { theme } from "docs-shared";

export default theme("auto-catalog", {
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
  },
});

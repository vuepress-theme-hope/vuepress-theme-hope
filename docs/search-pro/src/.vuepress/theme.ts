import { theme } from "docs-shared";

// The theme wrapper is located in <root>/docs-shared/src/theme-wrapper.ts
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
    // @ts-expect-error: Force disable docsearch
    docsearch: false,

    markdownImage: {
      mark: true,
    },

    markdownTab: {
      codeTabs: true,
    },

    searchPro: {
      searchDelay: 800,
      suggestDelay: 300,
    },
  },
});

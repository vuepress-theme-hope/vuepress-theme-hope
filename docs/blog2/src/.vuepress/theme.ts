import { pwa, theme } from "docs-shared";

export default theme("blog2", {
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
      mermaid: true,
    },

    pwa: pwa({
      name: "vuepress-plugin-blog2",
      shortName: "VuePress2 Blog plugin",
    }),
  },
});

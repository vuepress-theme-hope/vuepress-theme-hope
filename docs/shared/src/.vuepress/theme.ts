import { pwa, theme } from "docs-shared";

export default theme("seo2", {
  locales: {
    "/": {
      navbar: [
        "/",
        "/shared",
        { text: "Node", prefix: "/node/", children: ["bundler"] },
        "/client",
      ],

      sidebar: false,
    },

    "/zh/": {
      navbar: [
        "/zh/",
        "/zh/shared",
        {
          text: "Node",
          prefix: "/zh/node/",
          children: ["bundler"],
        },
        "/zh/client",
      ],

      sidebar: false,
    },
  },

  plugins: {
    mdEnhance: {
      codetabs: true,
    },

    pwa: pwa({
      name: "vuepress-shared",
      shortName: "VuePress2 Shared utils",
    }),
  },
});

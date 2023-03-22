import { theme } from "docs-shared";

export default theme("seo2", {
  locales: {
    "/": {
      navbar: [
        "/",
        "/shared",
        {
          text: "Node",
          icon: "fab fa-node-js",
          prefix: "/node/",
          children: ["bundler", "locale", "content", "date"],
        },
        "/client",
      ],

      sidebar: "structure",
    },

    "/zh/": {
      navbar: [
        "/zh/",
        "/zh/shared",
        {
          text: "Node",
          icon: "fab fa-node-js",
          prefix: "/zh/node/",
          children: ["bundler", "locale", "content", "date"],
        },
        "/zh/client",
      ],

      sidebar: "structure",
    },
  },

  plugins: {
    mdEnhance: {
      codetabs: true,
    },
  },
});

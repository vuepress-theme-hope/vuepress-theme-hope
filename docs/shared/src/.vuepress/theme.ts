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
          children: ["bundler", "content"],
        },
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
          icon: "fab fa-node-js",
          prefix: "/zh/node/",
          children: ["bundler", "content"],
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
  },
});

import { theme } from "docs-shared";

export default theme("shared", {
  locales: {
    "/": {
      navbar: [
        "/",
        "/shared",
        {
          text: "Node",
          icon: "fab fa-node-js",
          prefix: "/node/",
          children: ["bundler", "locale", "content", "date", "env"],
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
          children: ["bundler", "locale", "content", "date", "env"],
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

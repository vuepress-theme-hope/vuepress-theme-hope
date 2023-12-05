import { theme } from "docs-shared";

// the theme wrapper is located in <root>/docs-shared/src/theme-wrapper.ts
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
      imgMark: true,
    },
  },
});

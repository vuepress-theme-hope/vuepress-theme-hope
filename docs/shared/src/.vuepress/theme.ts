import { theme } from "docs-shared";

// The theme wrapper is located in <root>/docs-shared/src/theme-wrapper.ts
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
          children: ["locale"],
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
          children: ["locale"],
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

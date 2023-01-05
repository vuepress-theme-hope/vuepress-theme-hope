import { theme } from "docs-shared";

export default theme("seo2", {
  locales: {
    "/": {
      navbar: [
        "/",
        "/shared",
        { text: "Node", prefix: "/node/", children: ["bundler", "content"] },
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

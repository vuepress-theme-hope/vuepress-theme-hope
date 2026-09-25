import { theme } from "@docs/shared";
import { AVAILABLE_SERVICES } from "vuepress-plugin-components";

// The theme wrapper is located in <root>/docs/shared/src/theme-wrapper.ts
export default theme("components", {
  locales: {
    "/": {
      navbar: ["/", "/guide/", "/config", "/demo"],

      sidebar: [
        "/",
        {
          icon: "puzzle-piece",
          text: "Components",
          prefix: "/guide/",
          children: "structure",
        },
        "/config",
      ],
    },

    "/zh/": {
      navbar: ["/zh/", "/zh/guide/", "/zh/config", "/zh/demo"],

      sidebar: [
        "/zh/",
        {
          icon: "puzzle-piece",
          text: "组件",
          prefix: "/zh/guide/",
          children: "structure",
        },
        "/zh/config",
      ],
    },
  },

  markdown: {
    codeTabs: true,
    imgMark: true,
    include: true,
    preview: true,
  },

  plugins: {
    components: {
      components: ["Badge", "CodePen", "Share", "SiteInfo", "StackBlitz", "VPBanner", "VPCard"],

      componentOptions: {
        share: {
          services: AVAILABLE_SERVICES,
        },
      },
    },
  },
});

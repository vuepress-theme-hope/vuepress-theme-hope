import { theme } from "docs-shared";
import { AVAILABLE_SERVICES } from "vuepress-plugin-components";
import pkg from "vuepress-plugin-components/package.json" with { type: "json" };

// The theme wrapper is located in <root>/docs-shared/src/theme-wrapper.ts
export default theme("components", {
  locales: {
    "/": {
      navbar: [
        "/",
        "/guide/",
        "/config",
        "/demo",
        {
          text: pkg.version,
          icon: "bookmark",
          link: "",
        },
      ],

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
      navbar: [
        "/zh/",
        "/zh/guide/",
        "/zh/config",
        "/zh/demo",
        {
          text: pkg.version,
          icon: "bookmark",
          link: "",
        },
      ],

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
    demo: true,
  },

  plugins: {
    components: {
      components: [
        "ArtPlayer",
        // @ts-expect-error: This component is deprecated
        "AudioPlayer",
        "Badge",
        "BiliBili",
        "CodePen",
        "PDF",
        "Share",
        "SiteInfo",
        "StackBlitz",
        "VPBanner",
        "VPCard",
        "VidStack",
        // @ts-expect-error: This component is deprecated
        "VideoPlayer",
        // @ts-expect-error: This component is deprecated
        "YouTube",
      ],

      componentOptions: {
        share: {
          services: AVAILABLE_SERVICES,
        },
      },
    },
  },
});

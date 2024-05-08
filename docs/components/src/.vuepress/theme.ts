import { createRequire } from "node:module";

import { theme } from "docs-shared";
import { fs } from "vuepress/utils";
import { AVAILABLE_SERVICES } from "vuepress-plugin-components";

const { version } = fs.readJsonSync(
  createRequire(import.meta.url).resolve(
    "vuepress-plugin-components/package.json",
  ),
) as { version: string };

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
          text: version,
          icon: "bookmark",
          children: [
            {
              text: "V1 Docs",
              link: "https://vuepress-theme-hope.github.io/v1/components/",
            },
          ],
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
          text: version,
          icon: "bookmark",
          children: [
            {
              text: "V1 文档",
              link: "https://vuepress-theme-hope.github.io/v1/components/zh/",
            },
          ],
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
        // @ts-expect-error: This component is deprecated
        "Replit",
        "Share",
        "SiteInfo",
        "StackBlitz",
        "VPBanner",
        "VPCard",
        "VidStack",
        // @ts-expect-error: This component is deprecated
        "VideoPlayer",
        "XiGua",
        // @ts-expect-error: This component is deprecated
        "YouTube",
      ],

      componentOptions: {
        share: {
          services: AVAILABLE_SERVICES,
        },
      },
    },

    mdEnhance: {
      codetabs: true,
      demo: true,
      imgMark: true,
      include: true,
    },
  },
});

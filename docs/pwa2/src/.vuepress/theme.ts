import { createRequire } from "node:module";

import { theme } from "docs-shared";
import { fs } from "vuepress/utils";

const { version } = <{ version: string }>(
  fs.readJsonSync(
    createRequire(import.meta.url).resolve("vuepress-plugin-pwa2/package.json"),
  )
);

const assetsBase = "https://theme-hope-assets.vuejs.press/";

// The theme wrapper is located in <root>/docs-shared/src/theme-wrapper.ts
export default theme("pwa2", {
  locales: {
    "/": {
      navbar: [
        "/",
        "/guide",
        "/config",
        "/migration",
        "/demo",
        {
          text: version,
          icon: "bookmark",
          children: [
            {
              text: "V1 Docs",
              link: "https://vuepress-theme-hope.github.io/v1/pwa/",
            },
          ],
        },
      ],

      sidebar: false,
    },
    "/zh/": {
      navbar: [
        "/zh/",
        "/zh/guide",
        "/zh/config",
        "/zh/migration",
        "/zh/demo",
        {
          text: version,
          icon: "bookmark",
          children: [
            {
              text: "V1 文档",
              link: "https://vuepress-theme-hope.github.io/v1/pwa/zh/",
            },
          ],
        },
      ],

      sidebar: false,
    },
  },

  plugins: {
    mdEnhance: {
      codetabs: true,
      imgMark: true,
      footnote: true,
    },

    pwa: {
      update: "hint",
      favicon: "/favicon.ico",
      themeColor: "#46bd87",
      appendBase: true,
      apple: {
        icon: "/assets/icon/apple-icon-152.png",
        statusBarColor: "black",
      },
      msTile: {
        image: "/assets/icon/ms-icon-144.png",
        color: "#ffffff",
      },
      manifest: {
        name: "vuepress-plugin-pwa",
        // eslint-disable-next-line @typescript-eslint/naming-convention
        short_name: "VuePress2 PWA plugin",
        icons: [
          {
            src: `${assetsBase}icon/chrome-mask-512.png`,
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: `${assetsBase}icon/chrome-mask-192.png`,
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: `${assetsBase}icon/chrome-512.png`,
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: `${assetsBase}icon/chrome-192.png`,
            sizes: "192x192",
            type: "image/png",
          },
        ],
        shortcuts: [
          {
            name: "Guide",
            // eslint-disable-next-line @typescript-eslint/naming-convention
            short_name: "Guide",
            url: "/guide.html",
            icons: [
              {
                src: "/assets/icon/guide-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
            ],
          },
          {
            name: "Config",
            // eslint-disable-next-line @typescript-eslint/naming-convention
            short_name: "Config",
            url: "/config.html",
            icons: [
              {
                src: "/assets/icon/config-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
            ],
          },
        ],
      },

      generateSWConfig: {
        globIgnores: [
          // Ignore pdfjs
          "assets/lib/pdfjs/**",
        ],
      },
    },
  },
});

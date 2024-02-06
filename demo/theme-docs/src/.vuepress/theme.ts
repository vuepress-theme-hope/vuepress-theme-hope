import { hopeTheme } from "vuepress-theme-hope";

import { enNavbar, zhNavbar } from "./navbar/index.js";
import { enSidebar, zhSidebar } from "./sidebar/index.js";

const hostname =
  process.env["HOSTNAME"] || "https://theme-hope-docs-demo.vuejs.press";

export default hopeTheme(
  {
    hostname,

    author: {
      name: "Mr.Hope",
      url: "https://mister-hope.com",
    },

    iconAssets: "fontawesome-with-brands",

    logo: "https://theme-hope-assets.vuejs.press/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope",

    docsDir: "demo/theme-docs/src",

    locales: {
      "/": {
        // Navbar
        navbar: enNavbar,

        // Sidebar
        sidebar: enSidebar,

        footer: "Default footer",

        displayFooter: true,

        metaLocales: {
          editLink: "Edit this page on GitHub",
        },
      },

      /**
       * Chinese locale config
       */
      "/zh/": {
        // Navbar
        navbar: zhNavbar,

        // Sidebar
        sidebar: zhSidebar,

        footer: "默认页脚",

        displayFooter: true,

        // Page meta
        metaLocales: {
          editLink: "在 GitHub 上编辑此页",
        },
      },
    },

    encrypt: {
      config: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "/demo/encrypt.html": ["1234"],
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "/zh/demo/encrypt.html": ["1234"],
      },
    },

    plugins: {
      comment: {
        provider: "Giscus",
        repo: "vuepress-theme-hope/giscus-discussions",
        repoId: "R_kgDOG_Pt2A",
        category: "Announcements",
        categoryId: "DIC_kwDOG_Pt2M4COD69",
      },

      components: {
        components: ["Badge", "VPCard"],
      },

      // All features are enabled for demo, only preserve features you need here
      mdEnhance: {
        align: true,
        attrs: true,
        chart: true,
        codetabs: true,
        component: true,
        demo: true,
        echarts: true,
        figure: true,
        flowchart: true,
        gfm: true,
        imgLazyload: true,
        imgSize: true,
        include: true,
        katex: true,
        kotlinPlayground: true,
        mark: true,
        markmap: true,
        mermaid: true,
        playground: {
          presets: ["ts", "vue", "unocss"],
        },
        revealJs: {
          plugins: ["highlight", "math", "search", "notes", "zoom"],
        },
        sandpack: true,
        stylize: [
          {
            matcher: "Recommended",
            replacer: ({
              tag,
            }): {
              tag: string;
              attrs: Record<string, string>;
              content: string;
            } | void => {
              if (tag === "em")
                return {
                  tag: "Badge",
                  attrs: { type: "tip" },
                  content: "Recommended",
                };
            },
          },
        ],
        sub: true,
        sup: true,
        tabs: true,
        vPre: true,
        vuePlayground: true,
      },

      pwa: {
        favicon: "/favicon.ico",
        cacheHTML: true,
        cachePic: true,
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
          icons: [
            {
              src: "/assets/icon/chrome-mask-512.png",
              sizes: "512x512",
              purpose: "maskable",
              type: "image/png",
            },
            {
              src: "/assets/icon/chrome-mask-192.png",
              sizes: "192x192",
              purpose: "maskable",
              type: "image/png",
            },
            {
              src: "/assets/icon/chrome-512.png",
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: "/assets/icon/chrome-192.png",
              sizes: "192x192",
              type: "image/png",
            },
          ],
          shortcuts: [
            {
              name: "Demo",
              // eslint-disable-next-line @typescript-eslint/naming-convention
              short_name: "Demo",
              url: "/demo/",
              icons: [
                {
                  src: "/assets/icon/guide-maskable.png",
                  sizes: "192x192",
                  purpose: "maskable",
                  type: "image/png",
                },
              ],
            },
          ],
        },
      },

      seo:
        hostname === "https://theme-hope-docs-demo.vuejs.press"
          ? {}
          : { canonical: "https://theme-hope-docs-demo.vuejs.press" },
    },
  },
  { custom: true },
);

import { hopeTheme } from "vuepress-theme-hope";

import { enNavbar, zhNavbar } from "./navbar/index.js";
import { enSidebar, zhSidebar } from "./sidebar/index.js";

const hostname =
  process.env.HOSTNAME ?? "https://theme-hope-docs-demo.vuejs.press";

export default hopeTheme(
  {
    hostname,

    author: {
      name: "Mr.Hope",
      url: "https://mister-hope.com",
    },

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
        "/demo/encrypt.html": {
          hint: "Password: 1234",
          password: "1234",
        },
        "/zh/demo/encrypt.html": {
          hint: "Password: 1234",
          password: "1234",
        },
      },
    },

    // FIXME: All features are enabled for demo, only preserve features you need here
    markdown: {
      align: true,
      attrs: true,
      codeTabs: true,
      component: true,
      figure: true,
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      mark: true,
      math: true,
      revealjs: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
      spoiler: true,
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
      tasklist: true,
      vPre: true,

      chartjs: true,
      demo: true,
      echarts: true,
      flowchart: true,
      kotlinPlayground: true,
      markmap: true,
      mermaid: true,
      playground: {
        presets: ["ts", "vue", "unocss"],
      },
      sandpack: true,
      vuePlayground: true,
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

      icon: {
        prefix: "fa6-solid:",
      },

      pwa: {
        favicon: "/favicon.ico",
        cacheHTML: true,
        cacheImage: true,
        appendBase: true,
        apple: {
          icon: "/assets/icon/apple-icon-152.png",
          statusBarColor: "black",
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
  { custom: Boolean(process.env.THEME_CUSTOM) },
);

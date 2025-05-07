import { dateSorter } from "@vuepress/helper";
import { hopeTheme } from "vuepress-theme-hope";

import { enNavbar, zhNavbar } from "./navbar/index.js";
import { enSidebar, zhSidebar } from "./sidebar/index.js";

const hostname =
  process.env.HOSTNAME ?? "https://theme-hope-blog-demo.vuejs.press";

export default hopeTheme(
  {
    hostname,

    author: {
      name: "Mr.Hope",
      url: "https://mister-hope.com",
    },

    logo: "https://theme-hope-assets.vuejs.press/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope",

    docsDir: "demo/theme-blog/src",

    hotReload: true,

    blog: {
      medias: {
        Baidu: "https://example.com",
        BiliBili: "https://example.com",
        Bitbucket: "https://example.com",
        Dingding: "https://example.com",
        Discord: "https://example.com",
        Dribbble: "https://example.com",
        Email: "mailto:info@example.com",
        Evernote: "https://example.com",
        Facebook: "https://example.com",
        Flipboard: "https://example.com",
        Gitee: "https://example.com",
        GitHub: "https://example.com",
        Gitlab: "https://example.com",
        Gmail: "mailto:info@example.com",
        Instagram: "https://example.com",
        Lark: "https://example.com",
        Lines: "https://example.com",
        Linkedin: "https://example.com",
        Pinterest: "https://example.com",
        Pocket: "https://example.com",
        QQ: "https://example.com",
        Qzone: "https://example.com",
        Reddit: "https://example.com",
        Rss: "https://example.com",
        Steam: "https://example.com",
        Twitter: "https://example.com",
        Wechat: "https://example.com",
        Weibo: "https://example.com",
        Whatsapp: "https://example.com",
        Youtube: "https://example.com",
        Zhihu: "https://example.com",
        VuePressThemeHope: {
          icon: "https://theme-hope-assets.vuejs.press/logo.svg",
          link: "https://theme-hope.vuejs.press",
        },
      },
    },

    locales: {
      "/": {
        // Navbar
        navbar: enNavbar,

        // Sidebar
        sidebar: enSidebar,

        footer: "Default footer",

        displayFooter: true,

        blog: {
          description: "A FrontEnd programmer",
          intro: "/intro.html",
        },

        blogLocales: {
          tutorial: "Tutorial",
        },

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

        blog: {
          description: "一个前端开发者",
          intro: "/zh/intro.html",
        },

        blogLocales: {
          tutorial: "教程",
        },

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
      blog: {
        type: [
          {
            key: "tutorial",
            filter: (page): boolean =>
              Boolean(page.filePathRelative?.includes("demo/")),
            sorter: (pageA, pageB): number =>
              dateSorter(pageA.frontmatter.date, pageB.frontmatter.date),
            layout: "Blog",
          },
        ],
      },

      comment: {
        provider: "Waline",
        serverURL: "https://waline-comment.vuejs.press",
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
        hostname === "https://theme-hope-blog-demo.vuejs.press"
          ? {}
          : { canonical: "https://theme-hope-blog-demo.vuejs.press" },
    },
  },
  { custom: Boolean(process.env.THEME_CUSTOM) },
);

const { config } = require("vuepress-theme-hope");

module.exports = config({
  title: "Theme Demo",
  description: "A demo for vuepress-theme-hope",

  dest: "./dist",

  locales: {
    "/zh/": {
      title: "Theme Demo",
      description: "vuepress-theme-hope 的 demo",
    },
  },

  themeConfig: {
    logo: "/logo.svg",
    hostname: "https://vuepress-theme-demo.mrhope.site/",

    nav: [
      { text: "Blog Home", link: "/", icon: "home" },
      { text: "Project Home", link: "/home/", icon: "home" },
      {
        text: "Guide",
        icon: "creative",
        link: "/guide/",
      },
      {
        text: "Docs",
        link: "https://vuepress-theme.mrhope.site/",
        icon: "note",
      },
    ],

    sidebar: {
      "/": [
        "",
        "home",
        "slides",
        {
          title: "Guide",
          icon: "creative",
          prefix: "guide/",
          children: ["", "page", "markdown", "disable", "encrypt"],
        },
      ],
    },

    locales: {
      "/zh/": {
        nav: [
          { text: "博客主页", link: "/zh/", icon: "home" },
          { text: "项目主页", link: "/zh/home/", icon: "home" },
          {
            text: "如何使用",
            icon: "creative",
            link: "/zh/guide/",
          },
          {
            text: "主题文档",
            icon: "note",
            link: "https://vuepress-theme.mrhope.site/zh/",
          },
        ],
        sidebar: {
          "/zh/": [
            "",
            "home",
            "slides",
            {
              title: "如何使用",
              icon: "creative",
              prefix: "guide/",
              children: ["", "page", "markdown", "disable", "encrypt"],
            },
          ],
        },
      },
    },

    author: "Mr.Hope",

    blog: {
      intro: "/intro/",
      sidebarDisplay: "mobile",
      links: {
        Zhihu: "https://zhihu.com",
        Baidu: "https://baidu.com",
        Github: "https://github.com",
      },
    },

    comment: {
      type: "valine",
      appId: "msnseO76haIVIGvfJ10BKnpv-gzGzoHsz",
      appKey: "9QMulKhu7EDp1va0TYXR2PrI",
    },

    copyright: {
      status: "global",
    },

    footer: {
      content: "默认页脚",
    },

    mdEnhance: {
      enableAll: true,
      presentation: {
        plugins: [
          "highlight",
          "math",
          "search",
          "notes",
          "zoom",
          "anything",
          "audio",
          "chalkboard",
        ],
      },
    },

    pwa: {
      favicon: "/favicon.ico",
      cachePic: true,
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
            name: "Guide",
            short_name: "Guide",
            url: "/guide/",
            icons: [
              {
                src: "/assets/icon/guide-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
              {
                src: "/assets/icon/guide-monochrome.png",
                sizes: "192x192",
                purpose: "monochrome",
                type: "image/png",
              },
            ],
          },
        ],
      },
    },

    repo: "https://github.com/mister-hope/vuepress-theme-hope",
    repoLabel: "Github",
  },
});

import hope from "vuepress-theme-hope";

export default hope.config({
  title: "Feed Generator",
  description: "Feed Plugin for vuepress",

  base: "/feed/",
  dest: "./dist",

  locales: {
    "/zh/": {
      title: "Feed 生成器",
      description: "VuePress Feed 插件",
    },
  },

  /** 主题配置 */
  themeConfig: {
    logo: "/logo.svg",
    hostname: "https://vuepress-theme-hope.github.io",

    author: "Mr.Hope",
    repo: "https://github.com/vuepress-theme-hope/vuepress-theme-hope",
    docsBranch: "v1",
    docsDir: "docs/feed/src",

    nav: [
      { text: "Home", icon: "home", link: "/" },
      {
        text: "Guide",
        icon: "creative",
        link: "/guide/",
      },
      {
        text: "Config",
        icon: "config",
        link: "/config/",
      },
    ],

    sidebar: {
      "/": [
        "",
        "guide",
        {
          title: "Config",
          icon: "config",
          prefix: "config/",
          collapsable: false,
          children: ["", "channel", "item"],
        },
      ],
    },

    locales: {
      "/zh/": {
        nav: [
          { text: "主页", icon: "home", link: "/zh/" },
          {
            text: "指南",
            icon: "creative",
            link: "/zh/guide/",
          },
          {
            text: "配置",
            icon: "config",
            link: "/zh/config/",
          },
        ],

        sidebar: {
          "/zh/": [
            "",
            "guide",
            {
              title: "配置",
              icon: "config",
              prefix: "config/",
              collapsable: false,
              children: ["", "channel", "item"],
            },
          ],
        },
      },
    },

    blog: false,

    footer: {
      display: true,
      copyright: "MIT Licensed | Copyright © 2019-present Mr.Hope",
    },

    comment: {
      type: "waline",
      serverURL: "https://vuepress-theme-hope-comment.vercel.app",
    },

    pwa: {
      favicon: "/feed/favicon.ico",
      themeColor: "#46bd87",
      cachePic: true,
      apple: {
        icon: "/feed/assets/icon/apple-icon-152.png",
        statusBarColor: "black",
      },
      msTile: {
        image: "/feed/assets/icon/ms-icon-144.png",
        color: "#ffffff",
      },
      manifest: {
        name: "@mr-hope/vuepress-plugin-feed",
        short_name: "feed plugin",
        icons: [
          {
            src: "/feed/assets/icon/chrome-mask-512.png",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/feed/assets/icon/chrome-mask-192.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/feed/assets/icon/chrome-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/feed/assets/icon/chrome-192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
        shortcuts: [
          {
            name: "Guide",
            short_name: "Guide",
            url: "/feed/guide/",
            icons: [
              {
                src: "/feed/assets/icon/guide-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
              {
                src: "/feed/assets/icon/guide-monochrome.png",
                sizes: "192x192",
                purpose: "monochrome",
                type: "image/png",
              },
            ],
          },
          {
            name: "Config",
            short_name: "Config",
            url: "/feed/config/",
            icons: [
              {
                src: "/feed/assets/icon/config-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
              {
                src: "/feed/assets/icon/config-monochrome.png",
                sizes: "192x192",
                purpose: "monochrome",
                type: "image/png",
              },
            ],
          },
        ],
      },
    },
  },
});

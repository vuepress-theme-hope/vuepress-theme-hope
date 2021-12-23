import hope from "vuepress-theme-hope";

export default hope.config({
  title: "Share Plugin",
  description: "Share Plugin provided by AddThis",

  base: "/add-this/",

  dest: "./dist",

  locales: {
    "/": { lang: "en-US" },
    "/zh/": {
      title: "分享插件",
      description: "由 AddThis 提供的分享插件",
    },
  },

  themeConfig: {
    logo: "/logo.svg",
    hostname: "https://vuepress-theme-hope.github.io",

    author: "Mr.Hope",
    repo: "https://github.com/vuepress-theme-hope/vuepress-theme-hope",
    docsBranch: "v1",
    docsDir: "docs/add-this/src",

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
      },
    },

    blog: false,

    footer: {
      display: true,
      copyright: "MIT Licensed | Copyright © 2019-present Mr.Hope",
    },

    addThis: "ra-5f829c59e6c6bc9a",

    comment: {
      type: "waline",
      serverURL: "https://vuepress-theme-hope-comment.vercel.app",
    },

    git: {
      timezone: "Asia/Shanghai",
    },

    pwa: {
      favicon: "/add-this/favicon.ico",
      themeColor: "#46bd87",
      cachePic: true,
      apple: {
        icon: "/add-this/assets/icon/apple-icon-152.png",
        statusBarColor: "black",
      },
      msTile: {
        image: "/add-this/assets/icon/ms-icon-144.png",
        color: "#ffffff",
      },
      manifest: {
        name: "vuepress-plugin-add-this",
        short_name: "add-this plugin",
        icons: [
          {
            src: "/add-this/assets/icon/chrome-mask-512.png",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/add-this/assets/icon/chrome-mask-192.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/add-this/assets/icon/chrome-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/add-this/assets/icon/chrome-192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
        shortcuts: [
          {
            name: "Guide",
            short_name: "Guide",
            url: "/add-this/guide/",
            icons: [
              {
                src: "/add-this/assets/icon/guide-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
              {
                src: "/add-this/assets/icon/guide-monochrome.png",
                sizes: "192x192",
                purpose: "monochrome",
                type: "image/png",
              },
            ],
          },
          {
            name: "Config",
            short_name: "Config",
            url: "/add-this/config/",
            icons: [
              {
                src: "/add-this/assets/icon/config-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
              {
                src: "/add-this/assets/icon/config-monochrome.png",
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

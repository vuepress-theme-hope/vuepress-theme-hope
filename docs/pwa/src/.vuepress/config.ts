import hope from "vuepress-theme-hope";

export default hope.config({
  title: "PWA Support",
  description: "A powerful PWA plugin for vuepress",

  base: "/pwa/",
  dest: "./dist",

  locales: {
    "/": { lang: "en-US" },
    "/zh/": {
      title: "PWA 支持",
      description: "一个强大的 PWA 插件",
    },
  },

  themeConfig: {
    logo: "/logo.svg",
    hostname: "https://vuepress-theme-hope.github.io",

    author: "Mr.Hope",
    repo: "https://github.com/vuepress-theme-hope/vuepress-theme-hopeeme-hope",
    docsBranch: "v1",
    docsDir: "docs/pwa/src",

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

    comment: {
      type: "waline",
      serverURL: "https://vuepress-theme-hope-comment.vercel.app",
    },

    git: {
      timezone: "Asia/Shanghai",
    },

    mdEnhance: {
      footnote: true,
    },

    pwa: {
      favicon: "/pwa/favicon.ico",
      themeColor: "#46bd87",
      cachePic: true,
      apple: {
        icon: "/pwa/assets/icon/apple-icon-152.png",
        statusBarColor: "black",
      },
      msTile: {
        image: "/pwa/assets/icon/ms-icon-144.png",
        color: "#ffffff",
      },
      manifest: {
        name: "@mr-hope/vuepress-plugin-pwa",
        short_name: "pwa plugin",
        icons: [
          {
            src: "/pwa/assets/icon/chrome-mask-512.png",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/pwa/assets/icon/chrome-mask-192.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/pwa/assets/icon/chrome-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/pwa/assets/icon/chrome-192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
        shortcuts: [
          {
            name: "Guide",
            short_name: "Guide",
            url: "/pwa/guide/",
            icons: [
              {
                src: "/pwa/assets/icon/guide-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
              {
                src: "/pwa/assets/icon/guide-monochrome.png",
                sizes: "192x192",
                purpose: "monochrome",
                type: "image/png",
              },
            ],
          },
          {
            name: "Config",
            short_name: "Config",
            url: "/pwa/config/",
            icons: [
              {
                src: "/pwa/assets/icon/config-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
              {
                src: "/pwa/assets/icon/config-monochrome.png",
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

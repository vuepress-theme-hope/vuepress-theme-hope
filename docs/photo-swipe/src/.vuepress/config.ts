import hope from "vuepress-theme-hope";

export default hope.config({
  title: "Photo preview",
  description: "Photo swipe Plugin for VuePress",

  base: "/photo-swipe/",
  dest: "./dist",

  locales: {
    "/": { lang: "en-US" },
    "/zh/": {
      title: "图片预览",
      description: "VuePress 的图片预览插件",
    },
  },

  themeConfig: {
    logo: "/logo.svg",
    hostname: "https://vuepress-theme-hope.github.io",

    author: "Mr.Hope",
    repo: "https://github.com/vuepress-theme-hope/vuepress-theme-hope",
    docsBranch: "v1",
    docsDir: "docs/photo-swipe/src",

    nav: [
      { text: "Home", icon: "home", link: "/" },
      { text: "Guide", icon: "creative", link: "/guide/" },
      { text: "Config", icon: "config", link: "/config/" },
    ],

    locales: {
      "/zh/": {
        nav: [
          { text: "主页", icon: "home", link: "/zh/" },
          { text: "指南", icon: "creative", link: "/zh/guide/" },
          { text: "配置", icon: "config", link: "/zh/config/" },
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

    pwa: {
      favicon: "/photo-swipe/favicon.ico",
      themeColor: "#46bd87",
      cachePic: true,
      apple: {
        icon: "/photo-swipe/assets/icon/apple-icon-152.png",
        statusBarColor: "black",
      },
      msTile: {
        image: "/photo-swipe/assets/icon/ms-icon-144.png",
        color: "#ffffff",
      },
      manifest: {
        name: "vuepress-plugin-photo-swipe",
        short_name: "photo-swipe plugin",
        icons: [
          {
            src: "/photo-swipe/assets/icon/chrome-mask-512.png",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/photo-swipe/assets/icon/chrome-mask-192.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/photo-swipe/assets/icon/chrome-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/photo-swipe/assets/icon/chrome-192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
        shortcuts: [
          {
            name: "Guide",
            short_name: "Guide",
            url: "/photo-swipe/guide/",
            icons: [
              {
                src: "/photo-swipe/assets/icon/guide-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
              {
                src: "/photo-swipe/assets/icon/guide-monochrome.png",
                sizes: "192x192",
                purpose: "monochrome",
                type: "image/png",
              },
            ],
          },
          {
            name: "Config",
            short_name: "Config",
            url: "/photo-swipe/config/",
            icons: [
              {
                src: "/photo-swipe/assets/icon/config-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
              {
                src: "/photo-swipe/assets/icon/config-monochrome.png",
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

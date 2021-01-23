const { config } = require("vuepress-theme-hope");

module.exports = config({
  title: "Photo preview",
  description: "Photo swipe Plugin for VuePress",

  dest: "./dist",

  locales: {
    "/zh/": {
      title: "图片预览",
      description: "VuePress 的图片预览插件",
    },
  },

  themeConfig: {
    logo: "/logo.svg",

    author: "Mr.Hope",
    iconPrefix: "vuepress-",

    nav: [
      { text: "Home", icon: "home", link: "/" },
      { text: "Demo", icon: "creative", link: "/demo/" },
      { text: "Config", icon: "config", link: "/config/" },
    ],

    footer: {
      display: true,
      copyright: "MIT Licensed | Copyright © 2019-present Mr.Hope",
    },

    mdEnhance: {
      enableAll: true,
    },

    comment: {
      type: "valine",
      appId: "xouo0O4gVnPMvGC5Kn5CAi26-gzGzoHsz",
      appKey: "T4CQVlS8wsnQkvXNX2T9wduv",
    },

    locales: {
      "/zh/": {
        nav: [
          { text: "主页", icon: "home", link: "/zh/" },
          { text: "演示", icon: "creative", link: "/zh/demo/" },
          { text: "配置", icon: "config", link: "/zh/config/" },
        ],
      },
    },
    pwa: {
      favicon: "/favicon.ico",
      themeColor: "#46bd87",
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
        name: "vuepress-plugin-photo-swipe",
        short_name: "photo-swipe plugin",
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
            short_name: "Demo",
            url: "/demo/",
            icons: [
              {
                src: "/assets/icon/demo-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
              {
                src: "/assets/icon/demo-monochrome.png",
                sizes: "192x192",
                purpose: "monochrome",
                type: "image/png",
              },
            ],
          },
          {
            name: "Config",
            short_name: "Config",
            url: "/config/",
            icons: [
              {
                src: "/assets/icon/config-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
              {
                src: "/assets/icon/config-monochrome.png",
                sizes: "192x192",
                purpose: "monochrome",
                type: "image/png",
              },
            ],
          },
        ],
      },
    },

    hostname: "https://vuepress-photo-swipe.mrhope.site/",

    repo: "https://github.com/mister-hope/vuepress-theme-hope",
    docsDir: "docs/photo-swipe/src",
  },
});

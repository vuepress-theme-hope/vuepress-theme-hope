const { config } = require("vuepress-theme-hope");

module.exports = config({
  title: "Photo preview",
  description: "Photo swipe Plugin for VuePress",

  base: "/photo-swipe/",
  dest: "./dist",

  locales: {
    "/zh/": {
      title: "图片预览",
      description: "VuePress 的图片预览插件",
    },
  },

  themeConfig: {
    logo: "/logo.svg",
    hostname: "https://vuepress-theme-hope.github.io",

    author: "Mr.Hope",
    iconPrefix: "vuepress-",
    repo: "https://github.com/vuepress-theme-hope/vuepress-theme-hope",
    docsDir: "docs/photo-swipe/src",

    nav: [
      { text: "Home", icon: "home", link: "/" },
      { text: "Demo", icon: "creative", link: "/demo/" },
      { text: "Config", icon: "config", link: "/config/" },
    ],

    locales: {
      "/zh/": {
        nav: [
          { text: "主页", icon: "home", link: "/zh/" },
          { text: "演示", icon: "creative", link: "/zh/demo/" },
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
      type: "valine",
      appId: "2vSLKb0SqFKKWEgrOPGy3sp1-gzGzoHsz",
      appKey: "vma8Ewk61WeNkI81O3CGpT2i",
    },

    lastUpdate: {
      timezone: "Asia/Shanghai",
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
  },
});

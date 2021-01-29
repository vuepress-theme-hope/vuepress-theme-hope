const { config } = require("vuepress-theme-hope");

module.exports = config({
  title: "SEO Enhance",
  description: "Using <meta> tags to Enhance Your site SEO",

  base: "/seo/",
  dest: "./dist",

  locales: {
    "/zh/": {
      title: "SEO 增强",
      description: "使用 <meta> tag 为你的站点提供 SEO 增强",
    },
  },

  themeConfig: {
    logo: "/logo.svg",
    hostname: "https://vuepress-theme-hope.mrhope.site",

    author: "Mr.Hope",
    iconPrefix: "vuepress-",
    repo: "https://github.com/mister-hope/vuepress-theme-hope",
    docsDir: "docs/seo/src",

    locales: {
      "/zh/": {},
    },

    blog: false,

    footer: {
      display: true,
      copyright: "MIT Licensed | Copyright © 2019-present Mr.Hope",
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
        name: "@mr-hope/vuepress-plugin-seo",
        short_name: "seo-plugin",
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
      },
    },
  },
});

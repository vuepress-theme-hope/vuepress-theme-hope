import hope from "vuepress-theme-hope";

export default hope.config({
  title: "Sitemap Generator",
  description: "Generate Sitemap for your site",

  base: "/sitemap/",
  dest: "./dist",

  locales: {
    "/": { lang: "en-US" },
    "/zh/": {
      title: "Sitemap 生成器",
      description: "为你的站点生成 Sitemap",
    },
  },

  themeConfig: {
    logo: "/logo.svg",
    hostname: "https://vuepress-theme-hope.github.io",

    author: "Mr.Hope",
    repo: "https://github.com/vuepress-theme-hope/vuepress-theme-hope",
    docsBranch: "v1",
    docsDir: "docs/sitemap/src",

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

    pwa: {
      favicon: "/sitemap/favicon.ico",
      themeColor: "#46bd87",
      cachePic: true,
      apple: {
        icon: "/sitemap/assets/icon/apple-icon-152.png",
        statusBarColor: "black",
      },
      msTile: {
        image: "/sitemap/assets/icon/ms-icon-144.png",
        color: "#ffffff",
      },
      manifest: {
        name: "@mr-hope/vuepress-plugin-sitemap",
        short_name: "sitemap plugin",
        icons: [
          {
            src: "/sitemap/assets/icon/chrome-mask-512.png",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/sitemap/assets/icon/chrome-mask-192.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/sitemap/assets/icon/chrome-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/sitemap/assets/icon/chrome-192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
        shortcuts: [
          {
            name: "Guide",
            short_name: "Guide",
            url: "/sitemap/guide/",
            icons: [
              {
                src: "/sitemap/assets/icon/guide-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
              {
                src: "/sitemap/assets/icon/guide-monochrome.png",
                sizes: "192x192",
                purpose: "monochrome",
                type: "image/png",
              },
            ],
          },
          {
            name: "Config",
            short_name: "Config",
            url: "/sitemap/config/",
            icons: [
              {
                src: "/sitemap/assets/icon/config-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
              {
                src: "/sitemap/assets/icon/config-monochrome.png",
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

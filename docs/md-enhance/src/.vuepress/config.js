const { config } = require("vuepress-theme-hope");

module.exports = config({
  title: "Markdown Enhance",
  description: "Markdown Enhancement for VuePress",

  base: "/md-enhance/",
  dest: "./dist",

  head: [
    [
      "script",
      { src: "https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" },
    ],
    [
      "script",
      {
        src:
          "https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js",
      },
    ],
    ["script", { src: "https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js" }],
    [
      "script",
      { src: "https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js" },
    ],
  ],

  locales: {
    "/zh/": {
      title: "Markdown 增强",
      description: "VuePress 的 Markdown 增强插件",
    },
  },

  themeConfig: {
    logo: "/logo.svg",
    hostname: "https://vuepress-theme-hope.github.io",

    author: "Mr.Hope",
    iconPrefix: "vuepress-",
    repo: "https://github.com/vuepress-theme-hope/vuepress-theme-hope/",
    docsDir: "docs/md-enhance/src",

    nav: [
      { text: "Home", icon: "home", link: "/" },
      { text: "Guide", icon: "creative", link: "/guide/" },
      { text: "Config", icon: "config", link: "/config/" },
    ],

    sidebar: {
      "/guide/": [
        "",
        "sup-sub",
        "align",
        "footnote",
        "mark",
        "flowchart",
        "tex",
        "demo",
        {
          title: "Presentation",
          icon: "presentation",
          prefix: "presentation/",
          collapsable: false,
          children: ["", "demo", "themes"],
        },
      ],

      "/": ["", "guide/", "config"],
    },

    locales: {
      "/zh/": {
        nav: [
          { text: "主页", icon: "home", link: "/zh/" },
          { text: "指南", icon: "creative", link: "/zh/guide/" },
          { text: "配置", icon: "config", link: "/zh/config/" },
        ],
        sidebar: {
          "/zh/guide/": [
            "",
            "sup-sub",
            "align",
            "footnote",
            "mark",
            "flowchart",
            "tex",
            "demo",
            {
              title: "幻灯片",
              icon: "presentation",
              prefix: "presentation/",
              collapsable: false,
              children: ["", "demo", "themes"],
            },
          ],

          "/zh/": ["", "guide/", "config"],
        },
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

    mdEnhance: {
      enableAll: true,
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
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
        name: "vuepress-plugin-md-enhance",
        short_name: "md-enhance plugin",
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

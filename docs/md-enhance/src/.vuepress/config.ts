import hope from "vuepress-theme-hope";

export default hope.config({
  title: "Markdown Enhance",
  description: "Markdown Enhancement for VuePress",

  base: "/md-enhance/",
  dest: "./dist",

  locales: {
    "/": { lang: "en-US" },
    "/zh/": {
      title: "Markdown 增强",
      description: "VuePress 的 Markdown 增强插件",
    },
  },

  themeConfig: {
    logo: "/logo.svg",
    hostname: "https://vuepress-theme-hope.github.io",

    author: "Mr.Hope",
    repo: "https://github.com/vuepress-theme-hope/vuepress-theme-hope/",
    docsBranch: "v1",
    docsDir: "docs/md-enhance/src",

    nav: [
      { text: "Home", icon: "home", link: "/" },
      { text: "Guide", icon: "creative", link: "/guide/" },
      { text: "Config", icon: "config", link: "/config/" },
    ],

    sidebar: {
      "/": [
        "",
        {
          title: "Guide",
          icon: "creative",
          prefix: "guide/",
          collapsable: false,
          children: [
            "",
            "sup-sub",
            "align",
            "footnote",
            "mark",
            "tasklist",
            "flowchart",
            "mermaid",
            "tex",
            {
              title: "Code Demo",
              icon: "discover",
              prefix: "demo/",
              collapsable: false,
              children: ["", "normal", "vue", "react"],
            },
            {
              title: "Presentation",
              icon: "slides",
              prefix: "presentation/",
              collapsable: false,
              children: ["", "demo", "themes"],
            },
          ],
        },
        "config",
      ],
    },

    locales: {
      "/zh/": {
        nav: [
          { text: "主页", icon: "home", link: "/zh/" },
          { text: "指南", icon: "creative", link: "/zh/guide/" },
          { text: "配置", icon: "config", link: "/zh/config/" },
        ],
        sidebar: {
          "/zh/": [
            "",
            {
              title: "指南",
              icon: "creative",
              prefix: "guide/",
              collapsable: false,
              children: [
                "",
                "sup-sub",
                "align",
                "footnote",
                "mark",
                "tasklist",
                "flowchart",
                "mermaid",
                "tex",
                {
                  title: "代码演示",
                  icon: "discover",
                  prefix: "demo/",
                  collapsable: false,
                  children: ["", "normal", "vue", "react"],
                },
                {
                  title: "幻灯片",
                  icon: "slides",
                  prefix: "presentation/",
                  collapsable: false,
                  children: ["", "demo", "themes"],
                },
              ],
            },
            "config",
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

    git: {
      timezone: "Asia/Shanghai",
    },

    mdEnhance: {
      enableAll: true,
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
    },

    pwa: {
      favicon: "/md-enhance/favicon.ico",
      themeColor: "#46bd87",
      cachePic: true,
      apple: {
        icon: "/md-enhance/assets/icon/apple-icon-152.png",
        statusBarColor: "black",
      },
      msTile: {
        image: "/md-enhance/assets/icon/ms-icon-144.png",
        color: "#ffffff",
      },
      manifest: {
        name: "vuepress-plugin-md-enhance",
        short_name: "md-enhance plugin",
        icons: [
          {
            src: "/md-enhance/assets/icon/chrome-mask-512.png",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/md-enhance/assets/icon/chrome-mask-192.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/md-enhance/assets/icon/chrome-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/md-enhance/assets/icon/chrome-192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
        shortcuts: [
          {
            name: "Guide",
            short_name: "Guide",
            url: "/md-enhance/guide/",
            icons: [
              {
                src: "/md-enhance/assets/icon/guide-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
              {
                src: "/md-enhance/assets/icon/guide-monochrome.png",
                sizes: "192x192",
                purpose: "monochrome",
                type: "image/png",
              },
            ],
          },
          {
            name: "Config",
            short_name: "Config",
            url: "/md-enhance/config/",
            icons: [
              {
                src: "/md-enhance/assets/icon/config-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
              {
                src: "/md-enhance/assets/icon/config-monochrome.png",
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

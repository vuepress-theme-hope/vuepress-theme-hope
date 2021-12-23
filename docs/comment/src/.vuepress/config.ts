import hope from "vuepress-theme-hope";

export default hope.config({
  title: "Comment Plugin",
  description: "Comment Plugin for VuePress",

  base: "/comment/",
  dest: "./dist",

  locales: {
    "/": { lang: "en-US" },
    "/zh/": { title: "评论插件", description: "VuePress 的评论插件" },
  },

  themeConfig: {
    logo: "/logo.svg",
    hostname: "https://vuepress-theme-hope.github.io",

    author: "Mr.Hope",
    repo: "https://github.com/vuepress-theme-hope/vuepress-theme-hope",
    docsBranch: "v1",
    docsDir: "docs/comment/src",

    nav: [
      { text: "Home", icon: "home", link: "/" },
      {
        text: "Guide",
        icon: "creative",
        items: [
          {
            text: "Page Info",
            icon: "info",
            link: "/guide/page-info/",
          },
          { text: "Waline", icon: "waline", link: "/guide/waline/" },
          { text: "Vssue", icon: "vssue", link: "/guide/vssue/" },
          { text: "Valine", icon: "valine", link: "/guide/valine/" },
        ],
      },
      {
        text: "Config",
        icon: "config",
        items: [
          { text: "Config", icon: "config", link: "/config/" },
          {
            text: "Waline",
            icon: "waline",
            link: "/config/waline/",
          },
          { text: "Vssue", icon: "vssue", link: "/config/vssue/" },
          {
            text: "Valine",
            icon: "valine",
            link: "/config/valine/",
          },
        ],
      },
    ],

    sidebar: {
      "/guide/": [
        "",
        "page-info",
        "waline",
        {
          title: "Vssue",
          icon: "vssue",
          collapsable: false,
          children: [
            "vssue",
            {
              title: "Supported platforms",
              icon: "support",
              collapsable: false,
              children: [
                "supported-platforms",
                "github",
                "gitlab",
                "gitee",
                "bitbucket",
              ],
            },
          ],
        },
        "valine",
      ],
      "/config/": ["", "waline", "vssue", "valine"],
      "/": ["guide/", "config/"],
    },

    locales: {
      "/zh/": {
        nav: [
          { text: "主页", icon: "home", link: "/zh/" },
          {
            text: "指南",
            icon: "creative",
            items: [
              {
                text: "页面信息",
                icon: "info",
                link: "/zh/guide/page-info/",
              },
              { text: "Waline", icon: "waline", link: "/zh/guide/waline/" },
              { text: "Vssue", icon: "vssue", link: "/zh/guide/vssue/" },
              { text: "Valine", icon: "valine", link: "/zh/guide/valine/" },
            ],
          },
          {
            text: "配置",
            icon: "config",
            items: [
              { text: "配置", icon: "config", link: "/zh/config/" },
              { text: "Waline", icon: "waline", link: "/zh/config/waline/" },
              { text: "Vssue", icon: "vssue", link: "/zh/config/vssue/" },
              { text: "Valine", icon: "valine", link: "/zh/config/valine/" },
            ],
          },
        ],

        sidebar: {
          "/zh/guide/": [
            "",
            "page-info",
            "waline",
            {
              title: "Vssue",
              icon: "vssue",
              collapsable: false,
              children: [
                "vssue",
                {
                  title: "支持平台",
                  icon: "support",
                  collapsable: false,
                  children: [
                    "supported-platforms",
                    "github",
                    "gitlab",
                    "gitee",
                    "bitbucket",
                  ],
                },
              ],
            },
            "valine",
          ],
          "/zh/config/": ["", "waline", "vssue", "valine"],
          "/zh/": ["guide/", "config/"],
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

    pwa: {
      favicon: "/comment/favicon.ico",
      themeColor: "#46bd87",
      cachePic: true,
      apple: {
        icon: "/comment/assets/icon/apple-icon-152.png",
        statusBarColor: "black",
      },
      msTile: {
        image: "/comment/assets/icon/ms-icon-144.png",
        color: "#ffffff",
      },
      manifest: {
        name: "@mr-hope/vuepress-plugin-comment",
        short_name: "comment plugin",
        icons: [
          {
            src: "/comment/assets/icon/chrome-mask-512.png",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/comment/assets/icon/chrome-mask-192.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/comment/assets/icon/chrome-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/comment/assets/icon/chrome-192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
        shortcuts: [
          {
            name: "Guide",
            short_name: "Guide",
            url: "/comment/guide/",
            icons: [
              {
                src: "/comment/assets/icon/guide-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
              {
                src: "/comment/assets/icon/guide-monochrome.png",
                sizes: "192x192",
                purpose: "monochrome",
                type: "image/png",
              },
            ],
          },
          {
            name: "Config",
            short_name: "Config",
            url: "/comment/config/",
            icons: [
              {
                src: "/comment/assets/icon/config-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
              {
                src: "/comment/assets/icon/config-monochrome.png",
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

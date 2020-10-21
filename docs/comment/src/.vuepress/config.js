const { config } = require("vuepress-theme-hope");

module.exports = config({
  title: "Comment Plugin",
  description: "Comment Plugin for VuePress",

  headOption: {
    icon: "/favicon.ico",
    pwa: {
      manifest: "/manifest.json",
      themeColor: "#46bd87",
      appleStatusBarColor: "black",
      appleIcon: "/assets/icon/appleIcon152.png",
      msTileImage: "/assets/icon/msIcon144.png",
      msTileColor: "#ffffff",
    },
  },

  dest: "./dist",

  locales: {
    "/zh/": { title: "评论插件", description: "VuePress 的评论插件" },
  },

  themeConfig: {
    logo: "/logo.svg",

    nav: [
      { text: "Home", icon: "homefill", link: "/" },
      {
        text: "Guide",
        icon: "creativefill",
        items: [
          {
            text: "Page Info",
            icon: "infofill",
            link: "/guide/page-info/",
          },
          { text: "Valine", icon: "valine", link: "/guide/valine/" },
          { text: "Vssue", icon: "vssue", link: "/guide/vssue/" },
        ],
      },
      {
        text: "Config",
        icon: "configuration",
        items: [
          { text: "Config", icon: "configuration", link: "/config/" },
          {
            text: "Valine",
            icon: "valine",
            link: "/config/valine/",
          },
          { text: "Vssue", icon: "vssue", link: "/config/vssue/" },
        ],
      },
    ],

    sidebar: {
      "/guide/": [
        "",
        "page-info",
        "valine",
        {
          title: "Vssue",
          icon: "vssue",
          children: [
            "vssue",
            {
              title: "Supported platforms",
              icon: "support",
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
      ],
      "/config/": ["", "valine", "vssue"],
      "/": ["", "guide/", "config/"],
    },

    author: "Mr.Hope",
    iconPrefix: "vuepress-",

    footer: {
      display: true,
      copyright: "MIT Licensed | Copyright © 2019-present Mr.Hope",
    },

    mdEnhance: {
      enableAll: true,
    },

    comment: {
      type: "valine",
      appId: "GG2VSnGiz09Rx18y2OUzdaHS-gzGzoHsz",
      appKey: "fBf2dptTBHxNqALKrzUlBXeB",
    },

    locales: {
      "/zh/": {
        nav: [
          { text: "主页", icon: "homefill", link: "/zh/" },
          {
            text: "指南",
            icon: "creativefill",
            items: [
              {
                text: "页面信息",
                icon: "infofill",
                link: "/zh/guide/page-info/",
              },
              { text: "Valine", icon: "valine", link: "/zh/guide/valine/" },
              { text: "Vssue", icon: "vssue", link: "/zh/guide/vssue/" },
            ],
          },
          {
            text: "配置",
            icon: "configuration",
            items: [
              { text: "配置", icon: "configuration", link: "/zh/config/" },
              { text: "Valine", icon: "valine", link: "/zh/config/valine/" },
              { text: "Vssue", icon: "vssue", link: "/zh/config/vssue/" },
            ],
          },
        ],

        sidebar: {
          "/zh/guide/": [
            "",
            "page-info",
            "valine",
            {
              title: "Vssue",
              icon: "vssue",
              children: [
                "vssue",
                {
                  title: "支持平台",
                  icon: "support",
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
          ],
          "/zh/config/": ["", "valine", "vssue"],
          "/zh/": ["", "guide/", "config/"],
        },
      },
    },

    pwa: {
      cachePic: true,
      manifest: {
        name: "@mr-hope/vuepress-plugin-comment",
        short_name: "comment plugin",
        icons: [
          {
            src: "/assets/icon/chrome-192.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-512.png",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png",
          },
        ],
      },
    },

    hostname: "https://vuepress-comment.mrhope.site/",

    repo: "https://github.com/mister-hope/vuepress-theme-hope",
    docsDir: "docs/comment/src",
  },
});

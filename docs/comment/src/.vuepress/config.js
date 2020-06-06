const resolve = require("vuepress-theme-hope/resolve");

module.exports = resolve({
  title: "评论插件",
  description: "Vuepress 的 评论插件",

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

  temp: "./node_modules/.temp",
  dest: "./dist",

  locales: {
    "/en/": {
      title: "Comment Plugin",
      description: "Comment Plugin for Vuepress",
    },
  },

  themeConfig: {
    logo: "/logo.svg",

    nav: [
      { text: "主页", icon: "homefill", link: "/" },
      {
        text: "指南",
        icon: "creativefill",
        items: [
          { text: "页面信息", icon: "infofill", link: "/guide/page-info/" },
          { text: "Valine", icon: "valine", link: "/guide/valine/" },
          { text: "Vssue", icon: "vssue", link: "/guide/vssue/" },
        ],
      },
      {
        text: "配置",
        icon: "configuration",
        items: [
          { text: "配置", icon: "configuration", link: "/config/" },
          { text: "Valine", icon: "valine", link: "/config/valine/" },
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
      "/config/": ["", "valine", "vssue"],
      "/": ["", "guide/", "config/"],
    },

    author: "Mr.Hope",
    iconPrefix: "vuepress-",

    footer: {
      copyright: "MIT Licensed | Copyright © 2019-present Mr.Hope",
    },
    markdown: {
      enableAll: true,
    },
    comment: {
      type: "valine",
      appId: "GG2VSnGiz09Rx18y2OUzdaHS-gzGzoHsz",
      appKey: "fBf2dptTBHxNqALKrzUlBXeB",
    },

    locales: {
      "/en/": {
        nav: [
          { text: "Home", icon: "homefill", link: "/en/" },
          {
            text: "Guide",
            icon: "creativefill",
            items: [
              {
                text: "Page Info",
                icon: "infofill",
                link: "/en/guide/page-info/",
              },
              { text: "Valine", icon: "valine", link: "/en/guide/valine/" },
              { text: "Vssue", icon: "vssue", link: "/en/guide/vssue/" },
            ],
          },
          {
            text: "Config",
            icon: "configuration",
            items: [
              { text: "Config", icon: "configuration", link: "/en/config/" },
              {
                text: "Valine",
                icon: "valine",
                link: "/en/config/valine/",
              },
              { text: "Vssue", icon: "vssue", link: "/en/config/vssue/" },
            ],
          },
        ],

        sidebar: {
          "/en/guide/": [
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
          "/en/config/": ["", "valine", "vssue"],
          "/en/": ["", "guide/", "config/"],
        },
      },
    },
    hostname: "https://vuepress-comment.mrhope.site/",

    repo: "https://github.com/mister-hope/vuepress-theme-hope",
    docsDir: "docs/comment/src",
  },
});

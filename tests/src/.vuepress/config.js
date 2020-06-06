const resolve = require("vuepress-theme-hope/resolve");
const navBarConfig = require("./config/navBar");
const sideBarConfig = require("./config/sideBar");

module.exports = resolve({
  title: "Theme Demo",
  description: "vuepress-theme-hope 的 demo",

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
      title: "Theme Demo",
      description: "A demo for vuepress-theme-hope",
    },
  },

  extraWatchFiles: [
    ".vuepress/config/navBar.js",
    ".vuepress/config/sideBar.js",
    ".vuepress/config/theme.js",
  ],

  themeConfig: {
    logo: "/logo.svg",

    nav: navBarConfig.zh,
    sidebar: sideBarConfig.zh,

    author: "Mr.Hope",
    footer: {
      display: false,
    },
    pageInfo: [
      "Author",
      "Category",
      "ReadTime",
      "Tag",
      "Time",
      "Word",
      "Visitor",
    ],
    themeColor: false,

    markdown: { enableAll: true },

    comment: {
      type: "valine",
      appId: "msnseO76haIVIGvfJ10BKnpv-gzGzoHsz",
      appKey: "9QMulKhu7EDp1va0TYXR2PrI",
    },
    encrypt: {
      global: "01311031",
      config: {
        "/en/": ["1234", "5678"],
        "/test/detail/": "1234",
        "/test/footer/default": "5678",
      },
    },

    blog: {
      intro: "/intro/",
      sidebarDisplay: "mobile",
      links: {
        Zhihu: "https://zhihu.com",
        Baidu: "https://baidu.com",
        Github: "https://github.com",
      },
    },

    locales: {
      "/en/": {
        nav: navBarConfig.en,
        sidebar: sideBarConfig.en,
      },
    },
    hostname: "https://vuepress-theme-demo.mrhope.site/",
    repo: "https://github.com/mister-hope/vuepress-theme-hope",
    repoLabel: "Github",
    /** 分享设置 */
    // share: {
    //   content: ['qq', 'twitter', 'weibo'],
    //   fallbackImage: '/logo.png'
    // }
  },
});

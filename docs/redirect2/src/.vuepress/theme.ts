import { hopeTheme } from "vuepress-theme-hope";

const hostname =
  process.env.HOSTNAME || "https://vuepress-theme-hope-v2.netlify.app";

export default hopeTheme({
  hostname,

  author: {
    name: "Mr.Hope",
    url: "https://mrhope.site",
  },

  iconPrefix: "iconfont icon-",

  repo: "vuepress-theme-hope/vuepress-theme-hope/tree/main/packages/redirect2/",
  docsRepo: "vuepress-theme-hope/vuepress-theme-hope",
  docsDir: "docs/redirect2/src",

  logo: "/logo.svg",

  footer: "MIT Licensed | Copyright © 2019-present Mr.Hope",
  copyright: false,
  displayFooter: true,

  pageInfo: ["Category", "Tag", "ReadingTime"],

  locales: {
    "/": {
      navbar: ["/", "/guide", "/config", "/demo"],

      sidebar: false,
    },
    "/zh/": {
      navbar: ["/zh/", "/zh/guide", "/zh/config", "/zh/demo"],

      sidebar: false,
    },
  },

  plugins: {
    comment: {
      type: "giscus",
      repo: "vuepress-theme-hope/giscus-discussions",
      repoId: "R_kgDOG_Pt2A",
      category: "Announcements",
      categoryId: "DIC_kwDOG_Pt2M4COD69",
    },

    mdEnhance: {
      codegroup: true,
    },

    pwa: {
      appendBase: true,
      update: "hint",
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
        name: "vuepress-plugin-redirect2",
        short_name: "Redirect Plugin",
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
            url: "/guide.html",
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
            url: "/config.html",
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

    seo: {
      canonical:
        hostname === "https://vuepress-theme-hope.github.io"
          ? null
          : "https://vuepress-theme-hope.github.io/v2/redirect/",
    },
  },
});

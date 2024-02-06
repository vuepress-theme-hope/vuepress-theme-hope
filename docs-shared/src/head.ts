import type { HeadConfig } from "vuepress/shared";

const assetsBase = "https://theme-hope-assets.vuejs.press/";

export const pwaHead: HeadConfig[] = [
  [
    "link",
    {
      rel: "icon",
      href: `${assetsBase}icon/chrome-mask-512.png`,
      type: "image/png",
      sizes: "512x512",
    },
  ],
  [
    "link",
    {
      rel: "icon",
      href: `${assetsBase}icon/chrome-mask-192.png`,
      type: "image/png",
      sizes: "512x512",
    },
  ],
  [
    "link",
    {
      rel: "icon",
      href: `${assetsBase}icon/chrome-512.png`,
      type: "image/png",
      sizes: "192x192",
    },
  ],
  [
    "link",
    {
      rel: "icon",
      href: `${assetsBase}icon/chrome-192.png`,
      type: "image/png",
      sizes: "192x192",
    },
  ],
  ["meta", { name: "theme-color", content: "#46bd87" }],
  [
    "link",
    {
      rel: "apple-touch-icon",
      href: `${assetsBase}icon/apple-icon-152.png`,
    },
  ],
  [
    "meta",
    {
      name: "apple-mobile-web-app-status-bar-style",
      content: "black",
    },
  ],
];

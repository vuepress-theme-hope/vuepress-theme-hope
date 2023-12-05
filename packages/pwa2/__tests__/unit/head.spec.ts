import type { HeadConfig } from "@vuepress/core";
import { describe, expect, it } from "vitest";

import type { PWAOptions } from "../../src/node/index.js";
import { injectLinksToHead } from "../../src/node/injectHead.js";

const options: PWAOptions = {
  favicon: "/favicon.ico",

  manifest: {
    icons: [
      {
        src: "/assets/icon/chrome-192.png",
        sizes: "192x192",
      },
      {
        src: "/assets/icon/chrome-512.png",
        sizes: "512x512",
      },
      {
        src: "/assets/icon/chrome-mask-192.png",
        sizes: "192x192",
        purpose: "maskable",
        type: "image/png",
      },
      {
        src: "/assets/icon/chrome-mask-512.png",
        sizes: "512x512",
        purpose: "maskable",
        type: "image/png",
      },
    ],
    shortcuts: [
      {
        name: "Guide",
        url: "/guide/",
      },
      {
        name: "Config",
        url: "/config/",
      },
      {
        name: "Basic",
        url: "/basic/",
      },
    ],
  },

  themeColor: "#46bd87",
  apple: {
    icon: "/img/icon/appleIcon152.png",
    statusBarColor: "white",
    maskIcon: "/icons/safari-pinned-tab.svg",
  },
  msTile: {
    image: "/img/icon/msIcon144.png",
    color: "#ffffff",
  },
};

const options2: PWAOptions = {
  manifest: {
    icons: [
      {
        src: "/assets/icon/chrome-192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  },
};

describe("Test head function", () => {
  it("should generate PWA tags because they do not exist", () => {
    expect(injectLinksToHead(options)).toEqual([
      ["link", { rel: "icon", href: "/favicon.ico" }],
      [
        "link",
        {
          rel: "icon",
          href: "/assets/icon/chrome-192.png",
          sizes: "192x192",
        },
      ],
      [
        "link",
        {
          rel: "icon",
          href: "/assets/icon/chrome-512.png",
          sizes: "512x512",
        },
      ],
      [
        "link",
        {
          rel: "icon",
          href: "/assets/icon/chrome-mask-192.png",
          sizes: "192x192",
          type: "image/png",
        },
      ],
      [
        "link",
        {
          rel: "icon",
          href: "/assets/icon/chrome-mask-512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],

      [
        "link",
        {
          rel: "manifest",
          href: "/manifest.webmanifest",
          crossorigin: "use-credentials",
        },
      ],
      ["meta", { name: "theme-color", content: "#46bd87" }],
      ["link", { rel: "apple-touch-icon", href: "/img/icon/appleIcon152.png" }],
      ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
      [
        "meta",
        { name: "apple-mobile-web-app-status-bar-style", content: "white" },
      ],
      [
        "link",
        {
          rel: "mask-icon",
          href: "/icons/safari-pinned-tab.svg",
          color: "#46bd87",
        },
      ],
      [
        "meta",
        {
          name: "msapplication-TileImage",
          content: "/img/icon/msIcon144.png",
        },
      ],
      ["meta", { name: "msapplication-TileColor", content: "#ffffff" }],
      [
        "meta",
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover",
        },
      ],
    ]);
  });

  it("should not generate tags if them exist", () => {
    const headList: HeadConfig[] = [
      ["link", { rel: "icon", href: "/icon.ico" }],
      ["meta", { name: "theme-color", content: "#ffffff" }],
      ["meta", { name: "msapplication-TileColor", content: "#000000" }],
    ];

    expect(injectLinksToHead(options, "/", headList)).toEqual([
      ["link", { rel: "icon", href: "/icon.ico" }],

      ["meta", { name: "theme-color", content: "#ffffff" }],
      ["meta", { name: "msapplication-TileColor", content: "#000000" }],
      [
        "link",
        {
          rel: "manifest",
          href: "/manifest.webmanifest",
          crossorigin: "use-credentials",
        },
      ],
      ["link", { rel: "apple-touch-icon", href: "/img/icon/appleIcon152.png" }],
      ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
      [
        "meta",
        { name: "apple-mobile-web-app-status-bar-style", content: "white" },
      ],
      [
        "link",
        {
          rel: "mask-icon",
          href: "/icons/safari-pinned-tab.svg",
          color: "#46bd87",
        },
      ],
      [
        "meta",
        {
          name: "msapplication-TileImage",
          content: "/img/icon/msIcon144.png",
        },
      ],
      [
        "meta",
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover",
        },
      ],
    ]);
  });

  it("should generate some simple tags", () => {
    expect(injectLinksToHead(options2)).toEqual([
      [
        "link",
        {
          rel: "icon",
          href: "/assets/icon/chrome-192.png",
          sizes: "192x192",
          type: "image/png",
        },
      ],
      [
        "link",
        {
          rel: "manifest",
          href: "/manifest.webmanifest",
          crossorigin: "use-credentials",
        },
      ],
      ["meta", { name: "theme-color", content: "#46bd87" }],
      [
        "link",
        { rel: "apple-touch-icon", href: "/assets/icon/chrome-192.png" },
      ],
      ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
      [
        "meta",
        { name: "apple-mobile-web-app-status-bar-style", content: "black" },
      ],
      [
        "meta",
        {
          name: "msapplication-TileImage",
          content: "/assets/icon/chrome-192.png",
        },
      ],
      ["meta", { name: "msapplication-TileColor", content: "#46bd87" }],
      [
        "meta",
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover",
        },
      ],
    ]);
  });
});

import { describe, it } from "mocha";
import { HopeVuepressConfig } from "../types";
import { expect } from "chai";
import resolveHead from "../lib/resolveHead";

describe("Test resolveHead function", () => {
  it("should generate icon, author and PWA because they do not exist", () => {
    const config: HopeVuepressConfig = {
      theme: "hope",
      headOption: {
        icon: "/favicon.ico",
        pwa: {
          manifest: "/manifest.json",
          themeColor: "#46bd87",
          appleStatusBarColor: "black",
          appleIcon: "/img/icon/appleIcon152.png",
          msTileImage: "/img/icon/msIcon144.png",
          msTileColor: "#ffffff",
        },
      },
      head: [
        [
          "link",
          {
            rel: "mask-icon",
            href: "/icons/safari-pinned-tab.svg",
            color: "#46bd87",
          },
        ],
      ],
      themeConfig: {
        author: "Mr.Hope",
      },
    };

    resolveHead(config);

    expect(config).to.be.deep.equal({
      theme: "hope",
      head: [
        [
          "link",
          {
            rel: "mask-icon",
            href: "/icons/safari-pinned-tab.svg",
            color: "#46bd87",
          },
        ],
        ["link", { rel: "icon", href: "/favicon.ico" }],
        ["meta", { name: "author", content: "Mr.Hope" }],
        [
          "meta",
          {
            name: "viewport",
            content:
              "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover",
          },
        ],
        ["link", { rel: "manifest", href: "/manifest.json" }],
        ["meta", { name: "theme-color", content: "#46bd87" }],
        ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
        [
          "meta",
          { name: "apple-mobile-web-app-status-bar-style", content: "black" },
        ],
        [
          "link",
          { rel: "apple-touch-icon", href: "/img/icon/appleIcon152.png" },
        ],
        [
          "meta",
          {
            name: "msapplication-TileImage",
            content: "/img/icon/msIcon144.png",
          },
        ],
        ["meta", { name: "msapplication-TileColor", content: "#ffffff" }],
      ],
      headOption: {
        icon: "/favicon.ico",
        pwa: {
          manifest: "/manifest.json",
          themeColor: "#46bd87",
          appleStatusBarColor: "black",
          appleIcon: "/img/icon/appleIcon152.png",
          msTileImage: "/img/icon/msIcon144.png",
          msTileColor: "#ffffff",
        },
      },
      themeConfig: {
        author: "Mr.Hope",
      },
    });
  });

  it("should not generate icon and author if them exist", () => {
    const config: HopeVuepressConfig = {
      theme: "hope",
      head: [
        ["link", { rel: "icon", href: "/icon.ico" }],
        ["meta", { name: "author", content: "Mr.Hope" }],
      ],
      headOption: {
        icon: "/favicon.ico",
      },
      themeConfig: {
        author: "Ms.Hope",
      },
    };

    resolveHead(config);

    expect(config).to.be.deep.equal({
      theme: "hope",
      head: [
        ["link", { rel: "icon", href: "/icon.ico" }],
        ["meta", { name: "author", content: "Mr.Hope" }],
        [
          "meta",
          {
            name: "viewport",
            content:
              "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover",
          },
        ],
      ],
      headOption: {
        icon: "/favicon.ico",
      },
      themeConfig: {
        author: "Ms.Hope",
      },
    });
  });
});

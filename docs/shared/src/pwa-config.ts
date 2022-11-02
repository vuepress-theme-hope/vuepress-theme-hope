/* eslint-disable @typescript-eslint/naming-convention */
import type { HopeThemePluginsOptions } from "vuepress-theme-hope";

export interface GeneratePwaOptions {
  name: string;
  shortName: string;
  guide?: string | false;
  config?: string | false;
}

export const pwa = ({
  name,
  shortName,
  guide = "/guide.html",
  config = "/config.html",
}: GeneratePwaOptions): HopeThemePluginsOptions["pwa"] => {
  const shortcuts: Exclude<
    Exclude<HopeThemePluginsOptions["pwa"], boolean | undefined>["manifest"],
    undefined
  >["shortcuts"] = [];

  if (guide)
    shortcuts.push({
      name: "Guide",
      short_name: "Guide",
      url: guide,
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
    });

  if (config)
    shortcuts.push({
      name: "Config",
      short_name: "Config",
      url: config,
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
    });

  return {
    update: "hint",
    favicon: "/favicon.ico",
    themeColor: "#46bd87",
    appendBase: true,
    apple: {
      icon: "/assets/icon/apple-icon-152.png",
      statusBarColor: "black",
    },
    msTile: {
      image: "/assets/icon/ms-icon-144.png",
      color: "#ffffff",
    },
    manifest: {
      name,
      short_name: shortName,
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
      shortcuts,
    },
  };
};

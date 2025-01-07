import { getFullLocaleConfig } from "@vuepress/helper";
import type { App } from "vuepress/core";

import { getShareServiceConfig } from "./components/index.js";
import {
  pdfLocaleInfo,
  siteInfoLocaleInfo,
  vidstackLocaleInfo,
} from "./locales/index.js";
import type { ComponentPluginOptions } from "./options/index.js";
import { isInstalled } from "./utils.js";

export const getDefine =
  ({
    components = [],
    componentOptions = {},
    locales = {},
  }: ComponentPluginOptions): ((app: App) => Record<string, unknown>) =>
  (app) => {
    const result: Record<string, unknown> = {};

    if (components.includes("ArtPlayer") || components.includes("VidStack")) {
      result.DASHJS_INSTALLED = isInstalled("dashjs");
      result.HLS_JS_INSTALLED = isInstalled("hls.js");
    }

    if (components.includes("ArtPlayer")) {
      result.ART_PLAYER_OPTIONS = {
        fullscreen: true,
        playbackRate: true,
        setting: true,
        ...componentOptions.artPlayer,
      };
      result.MPEGTS_JS_INSTALLED = isInstalled("mpegts.js");
    }

    if (components.includes("PDF")) {
      result.PDF_LOCALES = getFullLocaleConfig({
        app,
        name: "pdf",
        default: pdfLocaleInfo,
        config: locales.pdf,
      });
      result.PDFJS_URL =
        typeof componentOptions.pdf?.pdfjs === "string"
          ? componentOptions.pdf.pdfjs
          : componentOptions.pdf?.pdfjs === false
            ? null
            : "https://theme-hope-assets.vuejs.press/pdfjs/";
    }

    if (components.includes("Share")) {
      result.SHARE_SERVICES = getShareServiceConfig(componentOptions.share);
    }

    if (components.includes("SiteInfo"))
      result.SITE_INFO_LOCALES = getFullLocaleConfig({
        app,
        name: "siteInfo",
        default: siteInfoLocaleInfo,
        config: locales.siteInfo,
      });

    if (components.includes("VidStack"))
      result.VIDSTACK_LOCALES = getFullLocaleConfig({
        app,
        name: "vidstack",
        default: vidstackLocaleInfo,
        config: locales.vidstack,
      });

    return result;
  };

import { getLocaleConfig } from "@vuepress/helper";
import type { App } from "vuepress/core";

import { getIconInfo, getShareServiceConfig } from "./components/index.js";
import {
  backToTopLocales,
  pdfLocaleConfig,
  siteInfoLocaleConfig,
  vidstackLocales,
} from "./locales/index.js";
import type { ComponentPluginOptions } from "./options/index.js";
import { isInstalled } from "./utils.js";

export const getDefine =
  (
    options: ComponentPluginOptions,
    legacy: boolean,
  ): ((app: App) => Record<string, unknown>) =>
  (app) => {
    const { assets, prefix } = options.componentOptions?.fontIcon ?? {};
    const result: Record<string, unknown> = {};

    if (options.components?.includes("FontIcon")) {
      const { type, prefix: iconPrefix } = getIconInfo(assets, prefix);

      result["FONT_ICON_TYPE"] = type;
      result["FONT_ICON_PREFIX"] = iconPrefix;
    }

    if (
      options.components?.includes("ArtPlayer") ||
      options.components?.includes("VidStack")
    ) {
      result["DASHJS_INSTALLED"] = isInstalled("dashjs");
      result["HLS_JS_INSTALLED"] = isInstalled("hls.js");
    }

    if (options.components?.includes("ArtPlayer")) {
      result["ART_PLAYER_OPTIONS"] = {
        fullscreen: true,
        playbackRate: true,
        setting: true,
        ...options.componentOptions?.artPlayer,
      };
      result["MPEGTS_JS_INSTALLED"] = isInstalled("mpegts.js");
    }

    if (options.components?.includes("PDF")) {
      result["PDF_LOCALES"] = getLocaleConfig({
        app,
        name: "pdf",
        default: pdfLocaleConfig,
        config: options.locales?.pdf,
      });
      result["PDFJS_URL"] =
        typeof options.componentOptions?.pdf?.pdfjs === "string"
          ? options.componentOptions?.pdf?.pdfjs
          : options.componentOptions?.pdf?.pdfjs === false
            ? null
            : "https://theme-hope-assets.vuejs.press/pdfjs/";
    }

    if (options.components?.includes("Share")) {
      result["SHARE_CONTENT_SELECTOR"] =
        options.componentOptions?.share?.contentSelector ??
        ".theme-default-content";
      result["SHARE_SERVICES"] = getShareServiceConfig(options);
    }

    if (options.components?.includes("SiteInfo"))
      result["SITE_INFO_LOCALES"] = getLocaleConfig({
        app,
        name: "siteInfo",
        default: siteInfoLocaleConfig,
        config: options.locales?.siteInfo,
      });

    if (options.components?.includes("VidStack"))
      result["VIDSTACK_LOCALES"] = getLocaleConfig({
        app,
        name: "vidstack",
        default: vidstackLocales,
        config: options.locales?.vidstack,
      });

    // TODO: Remove in v2 stable
    if (legacy && options.rootComponents?.backToTop)
      result["BACK_TO_TOP_LOCALES"] = getLocaleConfig({
        app,
        name: "backToTop",
        default: backToTopLocales,
        config: options.locales?.backToTop,
      });

    return result;
  };

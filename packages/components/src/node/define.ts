import { type App } from "@vuepress/core";
import { getLocales } from "vuepress-shared/node";

import { catalogLocales } from "./compact/index.js";
import { getIconInfo, getShareServiceConfig } from "./components/index.js";
import {
  backToTopLocales,
  pdfLocaleConfig,
  siteInfoLocaleConfig,
} from "./locales/index.js";
import { type ComponentOptions } from "./options/index.js";

export const getDefine =
  (
    options: ComponentOptions,
    legacy: boolean
  ): ((app: App) => Record<string, unknown>) =>
  (app) => {
    const { assets, prefix } = options.componentOptions?.fontIcon || {};
    const result: Record<string, unknown> = {};

    if (legacy && (options.components as unknown[])?.includes("Catalog"))
      result["CATALOG_LOCALES"] = getLocales({
        app,
        name: "catalog",
        default: catalogLocales,
        config: options.locales?.catalog,
      });

    if (options.components?.includes("FontIcon")) {
      const { type, prefix: iconPrefix } = getIconInfo(assets, prefix);

      result["FONT_ICON_TYPE"] = type;
      result["FONT_ICON_PREFIX"] = iconPrefix;
    }

    if (options.components?.includes("ArtPlayer"))
      result["ART_PLAYER_OPTIONS"] = {
        fullscreen: true,
        playbackRate: true,
        setting: true,
        ...(options.componentOptions?.artPlayer || {}),
      };

    if (options.components?.includes("PDF")) {
      result["PDF_LOCALES"] = getLocales({
        app,
        name: "pdf",
        default: pdfLocaleConfig,
        config: options.locales?.pdf,
      });
      result["PDFJS_URL"] = options.componentOptions?.pdf?.pdfjs || null;
    }

    if (options.components?.includes("Share")) {
      result["SHARE_CONTENT_SELECTOR"] =
        options.componentOptions?.share?.contentSelector ??
        ".theme-default-content";
      result["SHARE_SERVICES"] = getShareServiceConfig(options);
    }

    if (options.components?.includes("SiteInfo"))
      result["SITE_INFO_LOCALES"] = getLocales({
        app,
        name: "siteInfo",
        default: siteInfoLocaleConfig,
        config: options.locales?.siteInfo,
      });

    if (options.rootComponents?.backToTop)
      result["BACK_TO_TOP_LOCALES"] = getLocales({
        app,
        name: "backToTop",
        default: backToTopLocales,
        config: options.locales?.backToTop,
      });

    return result;
  };

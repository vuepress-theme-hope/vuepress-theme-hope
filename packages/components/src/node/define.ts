import { isString } from "@vuepress/shared";
import { getLocales } from "vuepress-shared/node";
import {
  backToTopLocales,
  catalogLocales,
  pdfLocaleConfig,
  siteInfoLocaleConfig,
} from "./locales/index.js";
import { getIconPrefix } from "./utils.js";

import type { App } from "@vuepress/core";
import type { ComponentOptions } from "./options.js";

export const getDefine =
  (options: ComponentOptions): ((app: App) => Record<string, unknown>) =>
  (app) => {
    const { assets, prefix } = options.componentOptions?.fontIcon || {};
    const result: Record<string, unknown> = {};

    if (options.components?.includes("Catalog"))
      result["CATALOG_LOCALES"] = getLocales({
        app,
        name: "catalog",
        default: catalogLocales,
        config: options.locales?.catalog,
      });

    if (options.components?.includes("FontIcon"))
      result["ICON_PREFIX"] = isString(prefix) ? prefix : getIconPrefix(assets);

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

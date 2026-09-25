import { getFullLocaleConfig } from "@vuepress/helper";
import type { App } from "vuepress/core";

import { getShareServiceConfig } from "./components/index.js";
import { siteInfoLocaleInfo } from "./locales/index.js";
import type { ComponentPluginOptions } from "./options/index.js";

export const getDefine =
  ({
    components = [],
    componentOptions = {},
    locales = {},
  }: ComponentPluginOptions): ((app: App) => Record<string, unknown>) =>
  (app) => {
    const result: Record<string, unknown> = {};

    if (components.includes("Share"))
      result.SHARE_SERVICES = getShareServiceConfig(componentOptions.share);

    if (components.includes("SiteInfo")) {
      result.SITE_INFO_LOCALES = getFullLocaleConfig({
        app,
        name: "siteInfo",
        default: siteInfoLocaleInfo,
        config: locales.siteInfo,
      });
    }

    return result;
  };

import { entries, fromEntries, getFullLocaleConfig } from "@vuepress/helper";
import type { App } from "vuepress/core";

import { getEncryptConfig } from "./getEncryptConfig.js";
import type { ThemeStatus } from "./getThemeStatus.js";
import type {
  ThemeData,
  ThemeLocaleConfig,
  ThemeLocaleOptions,
  ThemeOptions,
} from "../../shared/index.js";
import { themeLocaleInfo } from "../locales/index.js";
import { logger } from "../utils.js";

const ROOT_DISALLOW_CONFIG = [
  "navbar",
  "sidebar",
  "rtl",

  // Locales
  "metaLocales",
  "navbarLocales",
  "outlookLocales",
  "routeLocales",
  "blogLocales",
  "encryptLocales",
  "paginationLocales",
];

/**
 * @private
 *
 * Get client-side `themeData`
 */
export const getThemeData = (
  app: App,
  { encrypt, ...themeOptions }: ThemeOptions,
  { enableBlog, enableEncrypt }: ThemeStatus,
): ThemeData => {
  const themeData: ThemeData = {
    // Handle encrypt options
    encrypt: getEncryptConfig(encrypt),
    ...fromEntries(
      //remove root disallowed config
      entries(themeOptions).filter(
        ([key]) => !ROOT_DISALLOW_CONFIG.includes(key),
      ),
    ),
    locales:
      // Assign locale data to `themeConfig`
      getFullLocaleConfig({
        app,
        name: "vuepress-theme-hope",
        default: themeLocaleInfo.map(
          ([
            langs,
            // Make a copy here to avoid modifying the original data
            { ...localeData },
          ]) => {
            // Remove locales if their features are not enabled
            if (!enableBlog) {
              // @ts-expect-error: The type is not optional
              delete localeData.blogLocales;

              // @ts-expect-error: The type is not optional
              delete localeData.paginationLocales;
            }

            if (!enableEncrypt)
              // @ts-expect-error: The type is not optional
              delete localeData.encryptLocales;

            return [langs, localeData as ThemeLocaleConfig];
          },
        ),
        // Extract localeConfig
        config: fromEntries(
          entries<ThemeLocaleOptions>({
            // Ensure default locale
            "/": {},
            ...themeOptions.locales,
          }).map(([localePath, localeConfig]) => [
            localePath,
            {
              // Root config
              ...fromEntries(
                entries(themeOptions).filter(([key]) =>
                  ROOT_DISALLOW_CONFIG.includes(key),
                ),
              ),
              // Locale options
              ...localeConfig,
            } as ThemeLocaleConfig,
          ]),
        ),
      }),
  };

  if (app.env.isDebug) logger.info("Theme config: ", themeData);

  return themeData;
};

import { entries, fromEntries, getLocaleConfig } from "@vuepress/helper";
import type { App } from "vuepress/core";

import { getEncryptConfig } from "./encrypt.js";
import type { ThemeStatus } from "./status.js";
import type {
  ThemeData,
  ThemeLocaleConfig,
  ThemeLocaleOptions,
  ThemeOptions,
} from "../../shared/index.js";
import { themeLocalesData } from "../locales/index.js";
import { logger } from "../utils.js";

const ROOT_DISALLOW_CONFIG = [
  "navbar",
  "sidebar",
  "rtl",
  "langName",
  "selectLangAriaLabel",

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
  themeOptions: ThemeOptions,
  { enableBlog, enableEncrypt }: ThemeStatus,
): ThemeData => {
  const themeData: ThemeData = {
    encrypt: {},
    ...fromEntries(
      // Only remain root allowed config
      entries(themeOptions).filter(
        ([key]) => !ROOT_DISALLOW_CONFIG.includes(key),
      ),
    ),
    locales:
      // Assign locale data to `themeConfig`
      getLocaleConfig({
        app,
        name: "vuepress-theme-hope",
        default: fromEntries(
          entries(themeLocalesData).map(
            ([
              locale,
              // Make a copy here to avoid modifying the original data
              { ...config },
            ]) => {
              // Remove locales if their features are not enabled
              if (!enableBlog) {
                // @ts-expect-error
                delete config.blogLocales;

                // @ts-expect-error
                delete config.paginationLocales;
              }

              if (!enableEncrypt)
                // @ts-expect-error
                delete config.encryptLocales;

              return [locale, <ThemeLocaleConfig>config];
            },
          ),
        ),
        // Extract localeConfig
        config: fromEntries(
          entries<ThemeLocaleOptions>({
            // Ensure default locale
            "/": {},
            ...(themeOptions.locales || {}),
          }).map(([localePath, localeConfig]) => [
            localePath,
            <ThemeLocaleConfig>{
              // Root config
              ...fromEntries(
                entries(themeOptions).filter(([key]) =>
                  ROOT_DISALLOW_CONFIG.includes(key),
                ),
              ),
              // Locale options
              ...localeConfig,
            },
          ]),
        ),
      }),
  };

  // Handle encrypt options
  themeData.encrypt = getEncryptConfig(themeData.encrypt);

  if (app.env.isDebug) logger.info("Theme config: ", themeData);

  return themeData;
};

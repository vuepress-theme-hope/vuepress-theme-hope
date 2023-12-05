import type { App } from "@vuepress/core";
import { entries, fromEntries, getLocales } from "vuepress-shared/node";

import { getEncryptConfig } from "./encrypt.js";
import type { ThemeStatus } from "./status.js";
import type {
  ThemeData,
  ThemeLocaleConfig,
  ThemeLocaleOptions,
  ThemeOptions,
} from "../../shared/index.js";
import { themeLocalesData } from "../locales/index.js";

const ROOT_DISALLOW_CONFIG = [
  "navbar",
  "sidebar",
  "rtl",
  "langName",
  "selectLangAriaLabel",

  // locales
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
      // only remain root allowed config
      entries(themeOptions).filter(
        ([key]) => !ROOT_DISALLOW_CONFIG.includes(key),
      ),
    ),
    locales:
      // assign locale data to `themeConfig`
      getLocales({
        app,
        name: "vuepress-theme-hope",
        default: fromEntries(
          entries(themeLocalesData).map(([locale, config]) => {
            // remove locales if their features are not enabled
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
          }),
        ),
        // extract localeConfig
        config: fromEntries(
          entries<ThemeLocaleOptions>({
            // ensure default locale
            // eslint-disable-next-line @typescript-eslint/naming-convention
            "/": {},
            ...(themeOptions.locales || {}),
          }).map(([localePath, localeConfig]) => [
            localePath,
            <ThemeLocaleConfig>{
              // root config
              ...fromEntries(
                entries(themeOptions).filter(([key]) =>
                  ROOT_DISALLOW_CONFIG.includes(key),
                ),
              ),
              // locale options
              ...localeConfig,
            },
          ]),
        ),
      }),
  };

  // handle encrypt options
  themeData.encrypt = getEncryptConfig(themeData.encrypt);

  if (app.env.isDebug) console.log("Theme config: ", themeData);

  return themeData;
};

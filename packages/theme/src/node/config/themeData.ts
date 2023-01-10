import { getLocales } from "vuepress-shared/node";
import { getEncryptConfig } from "./encrypt.js";
import { themeLocalesData } from "../locales/index.js";

import type { App } from "@vuepress/core";
import type { ThemeStatus } from "./status.js";
import {
  ThemeData,
  ThemeLocaleConfig,
  ThemeLocaleOptions,
  ThemeOptions,
} from "../../shared/index.js";

const rootAllowConfig = [
  "blog",
  "encrypt",
  "print",
  "pure",
  "darkmode",
  "themeColor",
  "fullscreen",
  "mobileBreakPoint",
];

/**
 * Get client-side `themeData`
 */
export const getThemeData = (
  app: App,
  themeOptions: ThemeOptions,
  { enableBlog }: ThemeStatus
): ThemeData => {
  const themeData: ThemeData = {
    encrypt: {},
    ...Object.fromEntries(
      // only remain root allowed config
      Object.entries(themeOptions).filter(([key]) =>
        rootAllowConfig.includes(key)
      )
    ),
    locales:
      // assign locale data to `themeConfig`
      getLocales({
        app,
        name: "vuepress-theme-hope",
        default: Object.fromEntries(
          Object.entries(themeLocalesData).map(([locale, config]) => {
            // remove blog locales if blog is not enabled
            if (!enableBlog) {
              // @ts-ignore
              delete config.blogLocales;

              // @ts-ignore
              delete config.paginationLocales;
            }

            return [locale, <ThemeLocaleConfig>config];
          })
        ),
        // extract localeConfig
        config: Object.fromEntries(
          Object.entries<ThemeLocaleOptions>({
            // ensure default locale
            // eslint-disable-next-line @typescript-eslint/naming-convention
            "/": {},
            ...(themeOptions.locales || {}),
          }).map(([localePath, localeConfig]) => [
            localePath,
            <ThemeLocaleConfig>{
              // root config
              ...Object.fromEntries(
                Object.entries(themeOptions).filter(
                  ([key]) => key !== "locales" && !rootAllowConfig.includes(key)
                )
              ),
              // locale options
              ...localeConfig,
            },
          ])
        ),
      }),
  };

  // handle encrypt options
  themeData.encrypt = getEncryptConfig(themeData.encrypt);

  if (app.env.isDebug) console.log("Theme config: ", themeData);

  return themeData;
};

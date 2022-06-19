import { getLocales } from "vuepress-shared";
import { resolveEncrypt } from "./encrypt";
import { themeLocalesData } from "./locales";

import type { App } from "@vuepress/core";
import type { ThemeStatus } from "./status";
import {
  HopeThemeConfig,
  HopeThemeLocaleConfig,
  HopeThemeLocaleOptions,
  HopeThemeOptions,
  HopeThemeRootConfig,
} from "../shared";

const rootAllowConfig = [
  "blog",
  "encrypt",
  "pure",
  "darkmode",
  "themeColor",
  "fullscreen",
  "mobileBreakPoint",
];

const defaultRootOptions: HopeThemeRootConfig = {
  // features
  blog: {},
  encrypt: {},

  // appearance
  pure: false,
  darkmode: "switch",
  themeColor: false,
  fullscreen: false,
};

const defaultLocaleOptions: HopeThemeLocaleOptions = {
  // features
  blog: {},
  // layouts
  repoDisplay: true,
  navbarIcon: true,
  navbarAutoHide: "mobile",
  hideSiteNameonMobile: true,
  sidebar: "structure",
  sidebarIcon: true,
  headerDepth: 2,
};

/**
 * Get client-side `themeConfig`
 */
export const getThemeConfig = (
  app: App,
  themeOptions: HopeThemeOptions,
  { enableBlog }: ThemeStatus
): HopeThemeConfig => {
  const themeData: HopeThemeConfig = {
    ...defaultRootOptions,
    ...Object.fromEntries(
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
            if (!enableBlog) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              delete config.blogLocales;
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              delete config.paginationLocales;
            }

            return [
              locale,
              {
                // default config
                ...defaultLocaleOptions,
                ...config,
              } as HopeThemeLocaleConfig,
            ];
          })
        ),
        // extract localeConfig
        config: Object.fromEntries(
          [
            ["/", {}] as [string, HopeThemeLocaleOptions],
            ...Object.entries(themeOptions.locales || {}),
          ].map<[string, HopeThemeLocaleConfig]>(
            ([localePath, localeConfig]) => [
              localePath,
              {
                // root config
                ...Object.fromEntries(
                  Object.entries(themeOptions).filter(
                    ([key]) =>
                      key !== "locales" && !rootAllowConfig.includes(key)
                  )
                ),
                // locale options
                ...localeConfig,
              } as HopeThemeLocaleConfig,
            ]
          )
        ),
      }),
  };

  // handle encrypt options
  themeData.encrypt = resolveEncrypt(themeData.encrypt);

  if (app.env.isDebug) console.log("Theme config: ", themeData);

  return themeData;
};

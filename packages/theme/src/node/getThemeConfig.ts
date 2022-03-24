import { getLocales } from "@mr-hope/vuepress-shared";
import { resolveEncrypt } from "./encrypt";
import { themeLocalesData } from "./locales";

import type { App } from "@vuepress/core";
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
  "iconPrefix",
  "darkmode",
  "themeColor",
  "fullscreen",
  "backToTop",
  "mobileBreakPoint",
];

const defaultRootOptions: HopeThemeRootConfig = {
  // features
  blog: {},
  encrypt: {},

  // appearance
  pure: false,
  iconPrefix: "",
  darkmode: "auto-switch",
  themeColor: {
    red: "#e74c3c",
    blue: "#3498db",
    green: "#3eaf7c",
    orange: "#f39c12",
    purple: "#8e44ad",
  },
  fullscreen: true,
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
  themeOptions: HopeThemeOptions
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
      getLocales(
        app,
        themeLocalesData,
        // extract localeConfig
        Object.fromEntries(
          [
            ["/", {}] as [string, HopeThemeLocaleOptions],
            ...Object.entries(themeOptions.locales || {}),
          ].map<[string, HopeThemeLocaleConfig]>(
            ([localePath, localeConfig]) => [
              localePath,
              {
                // defauilt config
                ...defaultLocaleOptions,
                // root config
                ...Object.fromEntries(
                  Object.entries(themeOptions).filter(
                    ([key]) =>
                      key === "blog" ||
                      (key !== "locales" && !rootAllowConfig.includes(key))
                  )
                ),
                // locale options
                ...localeConfig,
              } as HopeThemeLocaleConfig,
            ]
          )
        )
      ) as HopeThemeLocaleConfig,
  };

  // handle encrypt options
  resolveEncrypt(themeData.encrypt);

  if (app.env.isDebug) console.log("Theme config: ", themeData);

  return themeData;
};

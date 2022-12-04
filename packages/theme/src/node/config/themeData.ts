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
  "pure",
  "darkmode",
  "themeColor",
  "fullscreen",
  "mobileBreakPoint",
];

const defaultRootOptions: Omit<ThemeData, "locales"> = {
  // features
  blog: {},
  encrypt: {},

  // appearance
  pure: false,
  darkmode: "switch",
  themeColor: false,
  fullscreen: false,
};

const defaultLocaleOptions: ThemeLocaleOptions = {
  // features
  blog: {},
  // layouts
  repoDisplay: true,
  navbarIcon: true,
  navbarAutoHide: "mobile",
  hideSiteNameOnMobile: true,
  sidebar: "structure",
  sidebarIcon: true,
  headerDepth: 2,
};

/**
 * Get client-side `themeData`
 */
export const getThemeData = (
  app: App,
  themeOptions: ThemeOptions,
  { enableBlog }: ThemeStatus
): ThemeData => {
  const themeData: ThemeData = {
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
              // @ts-ignore
              delete config.blogLocales;

              // @ts-ignore
              delete config.paginationLocales;
            }

            return [
              locale,
              <ThemeLocaleConfig>{
                // default config
                ...defaultLocaleOptions,
                ...config,
              },
            ];
          })
        ),
        // extract localeConfig
        config: Object.fromEntries(
          [
            <[string, ThemeLocaleOptions]>["/", {}],
            ...Object.entries(themeOptions.locales || {}),
          ].map<[string, ThemeLocaleConfig]>(([localePath, localeConfig]) => [
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

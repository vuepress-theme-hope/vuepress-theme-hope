import { deepAssignReverse, getLocales } from "@mr-hope/vuepress-shared";
import { resolveEncrypt } from "./encrypt";
import { themeLocalesData } from "./locales";

import type { App } from "@vuepress/core";
import type { HopeThemeConfig, HopeThemeOptions } from "../shared";

const defaultRootOptions: HopeThemeOptions = {
  blog: {
    articleInfo: [
      "Author",
      "Original",
      "Date",
      "Category",
      "Tag",
      "ReadingTime",
    ],
    articlePerPage: 10,
    sidebarDisplay: "mobile",
  },

  encrypt: {
    global: false,
  },

  // layouts
  repoDisplay: true,
  navbarIcon: true,
  navbarAutoHide: "mobile",
  hideSiteNameonMobile: true,

  sidebar: "auto",
  sidebarIcon: true,
  headingDepth: 2,

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
  fullScreen: true,
};

/**
 * Assign default options to `themeConfig`
 */
export const handleThemeData = (
  app: App,
  themeOptions: HopeThemeOptions
): void => {
  // ensure locales
  if (!themeOptions.locales) themeOptions.locales = {};

  // ensure root locales
  if (!themeOptions.locales["/"]) themeOptions.locales["/"] = {};

  // merge default options
  deepAssignReverse(defaultRootOptions, themeOptions);

  const themeData = themeOptions as HopeThemeConfig;

  // handle encrypt options
  resolveEncrypt(themeData.encrypt);

  // assign locale data to `themeConfig`
  themeOptions.locales = getLocales(
    app,
    themeLocalesData,
    themeOptions.locales
  );

  if (app.env.isDebug) console.log("Theme config: ", themeOptions);
};

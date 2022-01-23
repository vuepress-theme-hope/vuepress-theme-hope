import { getLocales, useGitPlugin, noopModule } from "@mr-hope/vuepress-shared";
import { path } from "@vuepress/utils";
import { usePalettePlugin } from "vuepress-plugin-sass-palette";
import { useReadingTimePlugin } from "vuepress-plugin-reading-time2";
import {
  backToTopLocales,
  pageInfoLocales,
  paginationLocales,
} from "./locales";

import type { Plugin } from "@vuepress/core";
import type { ComponentOptions } from "../shared";

export * from "../shared";

const componentPlugin: Plugin<ComponentOptions> = (options, app) => {
  usePalettePlugin(app, { id: "hope" });

  if (options.pageinfo) {
    useGitPlugin(app, {
      createdTime: true,
      updatedTime: true,
      contributors: true,
    });
    useReadingTimePlugin(app, { wordPerminute: options.wordPerminute });
  }

  return {
    name: "@mr-hope/vuepress-plugin-components",

    alias: {
      "@BackToTop": options.backToTop
        ? path.resolve(__dirname, "../client/BackToTop.vue")
        : noopModule,
      "@BreadCrumb": options.breadcrumb
        ? path.resolve(__dirname, "../client/BreadCrumb.vue")
        : noopModule,
      "@Badge": options.badge
        ? path.resolve(__dirname, "../client/Badge.vue")
        : noopModule,
      "@PageInfo": options.pageinfo
        ? path.resolve(__dirname, "../client/PageInfo.vue")
        : noopModule,
      "@Pagination": options.pagination
        ? path.resolve(__dirname, "../client/Pagination.vue")
        : noopModule,
      "@ScreenFull": options.screenFull
        ? path.resolve(__dirname, "../client/ScreenFull.vue")
        : noopModule,
    },

    define: {
      BACK_TO_TOP_THRESHOLD: options.backToTopThreshold || 300,
      BACK_TO_TOP_LOCALES: getLocales(
        app,
        backToTopLocales,
        options.backToTopLocales
      ),
      PAGE_INFO_LOCALES: getLocales(
        app,
        pageInfoLocales,
        options.pageInfoLocales
      ),
      PAGINATION_LOCALES: getLocales(
        app,
        paginationLocales,
        options.paginationLocales
      ),
    },

    clientAppEnhanceFiles: path.resolve(__dirname, "../client/appEnhance.js"),

    clientAppRootComponentFiles: options.backToTop
      ? path.resolve(__dirname, "../client/root-components/BackToTop.js")
      : undefined,
  };
};

export default componentPlugin;

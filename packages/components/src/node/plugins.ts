import {
  getLocales,
  useGitPlugin,
  noopModule,
  addViteOptimizeDeps,
} from "@mr-hope/vuepress-shared";
import { path } from "@vuepress/utils";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import { useReadingTimePlugin } from "vuepress-plugin-reading-time2";
import {
  backToTopLocales,
  pageInfoLocales,
  paginationLocales,
} from "./locales";

import type { Plugin, PluginConfig } from "@vuepress/core";
import type { ComponentOptions } from "../shared";

export const componentsPlugin: Plugin<ComponentOptions> = (options, app) => {
  if (options.backToTop) addViteOptimizeDeps(app, "lodash.debounce");
  if (options.screenFull) addViteOptimizeDeps(app, "screenfull");

  if (options.pageinfo) {
    useGitPlugin(app, {
      createdTime: true,
      updatedTime: true,
      contributors: true,
    });
    useReadingTimePlugin(app, { wordPerminute: options.wordPerminute });
  }

  useSassPalettePlugin(app, { id: "hope" });

  return {
    name: "@mr-hope/vuepress-plugin-components",

    alias: {
      "@BreadCrumb": options.breadcrumb
        ? path.resolve(__dirname, "../client/components/BreadCrumb.js")
        : noopModule,
      "@Badge": options.badge
        ? path.resolve(__dirname, "../client/components/Badge.js")
        : noopModule,
      "@PageInfo": options.pageinfo
        ? path.resolve(__dirname, "../client/components/PageInfo.js")
        : noopModule,
      "@Pagination": options.pagination
        ? path.resolve(__dirname, "../client/components/Pagination.js")
        : noopModule,
      "@ScreenFull": options.screenFull
        ? path.resolve(__dirname, "../client/components/ScreenFull.js")
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

export const components = (
  options: ComponentOptions | false
): PluginConfig<ComponentOptions> => [componentsPlugin, options];

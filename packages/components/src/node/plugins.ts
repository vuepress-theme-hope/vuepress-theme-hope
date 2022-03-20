import {
  addViteSsrNoExternal,
  addViteOptimizeDepsExclude,
  addViteOptimizeDepsInclude,
  getLocales,
  noopModule,
} from "@mr-hope/vuepress-shared";
import { path } from "@vuepress/utils";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import {
  articleInfoLocales,
  backToTopLocales,
  tocLocales,
  paginationLocales,
} from "./locales";

import type { Plugin, PluginConfig } from "@vuepress/core";
import type { AvailableComponent, ComponentOptions } from "../shared";

const availableComponents: AvailableComponent[] = [
  "ArticleInfo",
  "BreadCrumb",
  "Badge",
  "FullScreen",
  "Pagination",
  "TOC",
];

export const componentsPlugin: Plugin<ComponentOptions> = (options, app) => {
  useSassPalettePlugin(app, { id: "hope" });

  return {
    name: "@mr-hope/vuepress-plugin-components",

    alias: Object.fromEntries(
      availableComponents.map((item) => [
        `@${item}`,
        options.components?.includes(item)
          ? path.resolve(__dirname, `../client/components/${item}.js`)
          : noopModule,
      ])
    ),

    define: {
      ARTICLE_INFO_LOCALES: getLocales(
        app,
        articleInfoLocales,
        options.articleInfoLocales
      ),
      BACK_TO_TOP_THRESHOLD: options.backToTopThreshold || 300,
      BACK_TO_TOP_LOCALES: getLocales(
        app,
        backToTopLocales,
        options.backToTopLocales
      ),
      TOC_LOCALES: getLocales(app, tocLocales, options.tocLocales),
      PAGINATION_LOCALES: getLocales(
        app,
        paginationLocales,
        options.paginationLocales
      ),
    },

    onInitialized: (app): void => {
      addViteSsrNoExternal(app, [
        "@mr-hope/vuepress-shared",
        "@mr-hope/vuepress-plugin-components",
      ]);
      addViteOptimizeDepsExclude(app, "@mr-hope/vuepress-plugin-components");

      if (options.backToTop) addViteOptimizeDepsInclude(app, "lodash.debounce");
      if (options.components?.includes("FullScreen"))
        addViteOptimizeDepsInclude(app, "@vueuse/core");
    },

    clientAppEnhanceFiles: path.resolve(__dirname, "../client/appEnhance.js"),

    clientAppRootComponentFiles: options.backToTop
      ? path.resolve(__dirname, "../client/root-components/BackToTop.js")
      : undefined,
  };
};

export const components = (
  options: ComponentOptions | false
): PluginConfig<ComponentOptions> => ["@mr-hope/components", options];

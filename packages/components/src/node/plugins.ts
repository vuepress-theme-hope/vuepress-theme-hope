import {
  addViteSsrNoExternal,
  addViteOptimizeDepsExclude,
  addViteOptimizeDepsInclude,
  getLocales,
  noopModule,
} from "@mr-hope/vuepress-shared";
import { path } from "@vuepress/utils";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import { backToTopLocales } from "./locales";

import type { Plugin, PluginConfig } from "@vuepress/core";
import type { AvailableComponent, ComponentOptions } from "../shared";

const availableComponents: AvailableComponent[] = ["Badge"];

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
      BACK_TO_TOP_THRESHOLD: options.backToTopThreshold || 300,
      BACK_TO_TOP_LOCALES: getLocales(
        app,
        backToTopLocales,
        options.backToTopLocales
      ),
    },

    onInitialized: (app): void => {
      addViteSsrNoExternal(app, [
        "@mr-hope/vuepress-shared",
        "@mr-hope/vuepress-plugin-components",
      ]);
      addViteOptimizeDepsExclude(app, "@mr-hope/vuepress-plugin-components");

      if (options.backToTop) addViteOptimizeDepsInclude(app, "lodash.debounce");
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

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

import type { PluginFunction } from "@vuepress/core";
import type { AvailableComponent, ComponentOptions } from "../shared";

const availableComponents: AvailableComponent[] = ["Badge"];

export const componentsPlugin =
  (options: ComponentOptions): PluginFunction =>
  (app) => {
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
        BACK_TO_TOP_LOCALES: getLocales({
          app,
          name: "backToTop",
          default: backToTopLocales,
          config: options.backToTopLocales,
        }),
      },

      onInitialized: (app): void => {
        addViteSsrNoExternal(app, [
          "@mr-hope/vuepress-shared",
          "@mr-hope/vuepress-plugin-components",
        ]);
        addViteOptimizeDepsExclude(app, "@mr-hope/vuepress-plugin-components");

        if (options.backToTop)
          addViteOptimizeDepsInclude(app, "lodash.debounce");
      },

      clientAppEnhanceFiles: path.resolve(__dirname, "../client/appEnhance.js"),

      clientAppRootComponentFiles: options.backToTop
        ? path.resolve(__dirname, "../client/root-components/BackToTop.js")
        : undefined,
    };
  };

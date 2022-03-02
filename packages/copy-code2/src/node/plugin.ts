import {
  addViteSsrNoExternal,
  addViteOptimizeDepsExclude,
  getLocales,
} from "@mr-hope/vuepress-shared";
import { path } from "@vuepress/utils";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import { copyCodeLocales } from "./locales";

import type { Plugin, PluginConfig } from "@vuepress/core";
import type { CopyCodeOptions } from "../shared";

export const copyCodePlugin: Plugin<CopyCodeOptions> = (options, app) => {
  useSassPalettePlugin(app, { id: "hope" });

  return {
    name: "vuepress-plugin-copy-code2",

    define: (): Record<string, unknown> => ({
      CODE_COPY_OPIONS: options,
      CODE_COPY_LOCALES: getLocales(app, copyCodeLocales, options.locales),
    }),

    onInitialized: (app): void => {
      addViteSsrNoExternal(app, [
        "@mr-hope/vuepress-shared",
        "vuepress-plugin-copy-code2",
      ]);
      addViteOptimizeDepsExclude(app, "vuepress-plugin-copy-code2");
    },

    clientAppSetupFiles: path.resolve(__dirname, "../client/appSetup.js"),
  };
};

export const copyCode = (
  options: CopyCodeOptions | false
): PluginConfig<CopyCodeOptions> => ["copy-code2", options];

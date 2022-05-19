import { getLocales } from "@mr-hope/vuepress-shared";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import { backToTopLocales } from "./locales";
import { prepareConfigFile } from "./prepare";
import { logger } from "./utils";

import type { PluginFunction } from "@vuepress/core";
import type { ComponentOptions } from "../shared";

export const componentsPlugin =
  (options: ComponentOptions): PluginFunction =>
  (app) => {
    if (app.env.isDebug) logger.info(`Options: ${options.toString()}`);

    useSassPalettePlugin(app, { id: "hope" });

    return {
      name: "@mr-hope/vuepress-plugin-components",

      define: {
        BACK_TO_TOP_THRESHOLD: options.backToTopThreshold || 300,
        BACK_TO_TOP_LOCALES: getLocales({
          app,
          name: "backToTop",
          default: backToTopLocales,
          config: options.backToTopLocales,
        }),
      },

      clientConfigFile: (app) => prepareConfigFile(app, options),
    };
  };

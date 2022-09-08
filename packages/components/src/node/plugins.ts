import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import { addViteSsrNoExternal, getLocales } from "vuepress-shared";

import { backToTopLocales } from "./locales.js";
import { prepareConfigFile } from "./prepare.js";
import { getIconPrefix, logger } from "./utils.js";

import type { PluginFunction } from "@vuepress/core";
import type { ComponentOptions } from "../shared/index.js";

export const componentsPlugin =
  (options: ComponentOptions): PluginFunction =>
  (app) => {
    if (app.env.isDebug) logger.info(`Options: ${options.toString()}`);

    useSassPalettePlugin(app, { id: "hope" });

    return {
      name: "vuepress-plugin-components",

      define: {
        BACK_TO_TOP_LOCALES: getLocales({
          app,
          name: "backToTop",
          default: backToTopLocales,
          config: options.backToTopLocales,
        }),
        ICON_PREFIX:
          typeof options.iconPrefix === "string"
            ? options.iconPrefix
            : getIconPrefix(options.iconAssets),
      },

      extendsBundlerOptions: (config: unknown, app): void => {
        addViteSsrNoExternal({ app, config }, "vuepress-shared");
      },

      clientConfigFile: (app) => prepareConfigFile(app, options),
    };
  };

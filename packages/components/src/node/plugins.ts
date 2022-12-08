import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import { getLocales } from "vuepress-shared/node";

import { convertOptions } from "./convert/index.js";
import { backToTopLocales } from "./locales.js";
import { prepareConfigFile } from "./prepare.js";
import { getIconPrefix, logger } from "./utils.js";

import type { PluginFunction } from "@vuepress/core";
import type { ComponentOptions } from "./options.js";

export const componentsPlugin =
  (options: ComponentOptions, legacy = false): PluginFunction =>
  (app) => {
    // TODO: Remove this in v2 stable
    if (legacy)
      convertOptions(options as ComponentOptions & Record<string, unknown>);
    if (app.env.isDebug) logger.info(`Options: ${options.toString()}`);

    useSassPalettePlugin(app, { id: "hope" });

    return {
      name: "vuepress-plugin-components",

      define: () => {
        const { assets, prefix } = options.componentOptions?.fontIcon || {};

        return {
          BACK_TO_TOP_LOCALES: getLocales({
            app,
            name: "backToTop",
            default: backToTopLocales,
            config: options.locales?.backToTop,
          }),
          ICON_PREFIX:
            typeof prefix === "string" ? prefix : getIconPrefix(assets),
        };
      },

      clientConfigFile: (app) => prepareConfigFile(app, options),
    };
  };

import {
  addCustomElement,
  addViteOptimizeDepsInclude,
  addViteSsrNoExternal,
  getModulePath,
} from "@vuepress/helper";
import { useSassPalettePlugin } from "@vuepress/plugin-sass-palette";
import type { PluginFunction } from "vuepress/core";

import { convertOptions } from "./compact/index.js";
import { getDefine } from "./getDefine.js";
import type { ComponentPluginOptions } from "./options/index.js";
import { prepareConfigFile } from "./prepareConfigFile.js";
import { PLUGIN_NAME, logger } from "./utils.js";

export const componentsPlugin =
  (options: ComponentPluginOptions, legacy = true): PluginFunction =>
  (app) => {
    // TODO: Remove this in v2 stable
    if (legacy) convertOptions(options as ComponentPluginOptions & Record<string, unknown>);

    if (app.env.isDebug) logger.info("Options:", options);

    useSassPalettePlugin(app, {
      id: "hope",
      defaultConfig: getModulePath("vuepress-shared/styles/config.scss", import.meta),
    });

    return {
      name: PLUGIN_NAME,

      define: getDefine(options),

      extendsBundlerOptions: (bundlerOptions): void => {
        if (options.components?.includes("ArtPlayer"))
          addViteOptimizeDepsInclude(bundlerOptions, app, "artplayer");
        if (options.components?.includes("VidStack"))
          addCustomElement(bundlerOptions, app, /^media-/);

        addViteSsrNoExternal(bundlerOptions, app, ["@vuepress/helper", "vuepress-shared"]);
      },

      clientConfigFile: () => prepareConfigFile(app, options),
    };
  };

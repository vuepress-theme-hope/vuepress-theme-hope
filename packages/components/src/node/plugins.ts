import { addCustomElement, addViteSsrNoExternal } from "@vuepress/helper";
import type { PluginFunction } from "vuepress/core";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";

import { convertOptions } from "./compact/index.js";
import { getDefine } from "./define.js";
import type { ComponentOptions } from "./options/index.js";
import { prepareConfigFile } from "./prepare.js";
import { PLUGIN_NAME, logger } from "./utils.js";

export const componentsPlugin =
  (options: ComponentOptions, legacy = true): PluginFunction =>
  (app) => {
    // TODO: Remove this in v2 stable
    if (legacy)
      convertOptions(options as ComponentOptions & Record<string, unknown>);

    if (app.env.isDebug) logger.info("Options:", options);

    useSassPalettePlugin(app, { id: "hope" });

    return {
      name: PLUGIN_NAME,

      define: getDefine(options, legacy),

      extendsBundlerOptions: (bundlerOptions, app): void => {
        if (options?.components?.includes("VidStack"))
          addCustomElement(bundlerOptions, app, /^media-/);

        addViteSsrNoExternal(bundlerOptions, app, [
          "@vuepress/helper",
          "vuepress-shared",
        ]);
      },

      clientConfigFile: (app) => prepareConfigFile(app, options, legacy),
    };
  };

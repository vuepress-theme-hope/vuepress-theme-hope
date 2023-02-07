import { type PluginFunction } from "@vuepress/core";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";

import { extendsBundlerOptions } from "./bundler.js";
import { convertOptions } from "./compact/index.js";
import { getDefine } from "./define.js";
import { type ComponentOptions } from "./options/index.js";
import { prepareConfigFile } from "./prepare.js";
import { logger } from "./utils.js";

export const componentsPlugin =
  (options: ComponentOptions, legacy = true): PluginFunction =>
  (app) => {
    // TODO: Remove this in v2 stable
    if (legacy)
      convertOptions(options as ComponentOptions & Record<string, unknown>);
    if (app.env.isDebug) logger.info("Options:", options);

    useSassPalettePlugin(app, { id: "hope" });

    return {
      name: "vuepress-plugin-components",

      define: getDefine(options, legacy),

      extendsBundlerOptions,

      clientConfigFile: (app) => prepareConfigFile(app, options, legacy),
    };
  };

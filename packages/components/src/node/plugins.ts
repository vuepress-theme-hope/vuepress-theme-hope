import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";

import { extendsBundlerOptions } from "./bundler.js";
import { convertOptions } from "./convert/index.js";
import { getDefine } from "./define.js";
import { prepareConfigFile } from "./prepare.js";
import { logger } from "./utils.js";

import type { PluginFunction } from "@vuepress/core";

import type { ComponentOptions } from "./options.js";

export const componentsPlugin =
  (options: ComponentOptions, legacy = false): PluginFunction =>
  (app) => {
    // TODO: Remove this in v2 stable
    if (legacy)
      convertOptions(options as ComponentOptions & Record<string, unknown>);
    if (app.env.isDebug) logger.info("Options:", options);

    useSassPalettePlugin(app, { id: "hope" });

    return {
      name: "vuepress-plugin-components",

      define: getDefine(options),

      extendsBundlerOptions,

      clientConfigFile: (app) => prepareConfigFile(app, options),
    };
  };

import { type PluginFunction } from "@vuepress/core";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import { checkVersion } from "vuepress-shared/node";

import { convertOptions } from "./compact/index.js";
import { getDefine } from "./define.js";
import { type ComponentOptions } from "./options/index.js";
import { prepareConfigFile } from "./prepare.js";
import { PLUGIN_NAME, logger } from "./utils.js";

export const componentsPlugin =
  (options: ComponentOptions, legacy = true): PluginFunction =>
  (app) => {
    // TODO: Remove this in v2 stable
    if (legacy)
      convertOptions(options as ComponentOptions & Record<string, unknown>);
    checkVersion(app, PLUGIN_NAME, "2.0.0-beta.62");

    if (app.env.isDebug) logger.info("Options:", options);

    useSassPalettePlugin(app, { id: "hope" });

    return {
      name: PLUGIN_NAME,

      define: getDefine(options, legacy),

      clientConfigFile: (app) => prepareConfigFile(app, options, legacy),
    };
  };

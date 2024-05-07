import { addViteOptimizeDepsExclude } from "@vuepress/helper";
import { useSassPalettePlugin } from "@vuepress/plugin-sass-palette";
import type { PluginFunction } from "vuepress/core";

import { convertOptions } from "./compact.js";
import type { LightGalleryPluginOptions } from "./options.js";
import { prepareLightGalleryPlugins } from "./prepareLightGalleryPlugins.js";
import { CLIENT_FOLDER, PLUGIN_NAME, logger } from "./utils.js";

export const lightgalleryPlugin =
  (options: LightGalleryPluginOptions = {}, legacy = true): PluginFunction =>
  (app) => {
    if (legacy) convertOptions(options as Record<string, unknown>);

    if (app.env.isDebug) logger.info("Options:", options);

    const plugins = options.plugins ?? ["pager", "share", "zoom"];

    useSassPalettePlugin(app, { id: "hope" });

    return {
      name: PLUGIN_NAME,

      define: (): Record<string, unknown> => ({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        __LG_SELECTOR__:
          options.selector ??
          ".theme-default-content :not(a) > img:not([no-view])",
        // eslint-disable-next-line @typescript-eslint/naming-convention
        __LG_DELAY__: options.delay ?? 800,
      }),

      extendsBundlerOptions: (bundlerOptions: unknown, app): void => {
        addViteOptimizeDepsExclude(bundlerOptions, app, [
          "lightgallery/lightgallery.es5.js",
          ...plugins.map(
            (name) => `lightgallery/plugins/${name}/lg-${name}.es5.js`,
          ),
        ]);
        addViteOptimizeDepsExclude(bundlerOptions, app, ["lightgallery"]);
      },

      onPrepared: (app): Promise<void> =>
        prepareLightGalleryPlugins(app, options.plugins),

      clientConfigFile: `${CLIENT_FOLDER}config.js`,
    };
  };

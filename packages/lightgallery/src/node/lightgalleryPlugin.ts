import {
  addViteConfig,
  addViteOptimizeDepsExclude,
  chainWebpack,
} from "@vuepress/helper";
import { useSassPalettePlugin } from "@vuepress/plugin-sass-palette";
import type { PluginFunction } from "vuepress/core";

import { convertOptions } from "./compact.js";
import type { LightGalleryPluginOptions } from "./options.js";
import { prepareLightGalleryPlugins } from "./prepareLightGalleryPlugins.js";
import { CLIENT_FOLDER, PLUGIN_NAME, logger } from "./utils.js";

export const lightgalleryPlugin =
  (options: LightGalleryPluginOptions = {}, legacy = true): PluginFunction =>
  (app) => {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    if (legacy) convertOptions(options as Record<string, unknown>);

    if (app.env.isDebug) logger.info("Options:", options);

    const plugins = options.plugins ?? ["pager", "share", "zoom"];

    useSassPalettePlugin(app, { id: "hope" });

    return {
      name: PLUGIN_NAME,

      define: (): Record<string, unknown> => ({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        __LG_SELECTOR__:
          options.selector ?? "[vp-content] :not(a) > img:not([no-view])",
      }),

      extendsBundlerOptions: (bundlerOptions: unknown, app): void => {
        addViteOptimizeDepsExclude(bundlerOptions, app, [
          "lightgallery/lightgallery.es5.js",
          ...plugins.map(
            (name) => `lightgallery/plugins/${name}/lg-${name}.es5.js`,
          ),
        ]);
        addViteOptimizeDepsExclude(bundlerOptions, app, ["lightgallery"]);

        // FIXME: This is a workaround for https://github.com/sachinchoolur/lightGallery/issues/1677
        addViteConfig(bundlerOptions, app, {
          css: {
            preprocessorOptions: {
              scss: {
                quietDeps: true,
              },
            },
          },
        });
        chainWebpack(bundlerOptions, app, (config) => {
          config.module
            .rule("scss")
            .use("sass-loader")
            .tap((options) => ({
              ...options,
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              sassOptions: {
                quietDeps: true,
                ...options.sassOptions,
              },
            }));
        });
      },

      onPrepared: (app): Promise<void> =>
        prepareLightGalleryPlugins(app, options.plugins),

      clientConfigFile: `${CLIENT_FOLDER}config.js`,
    };
  };

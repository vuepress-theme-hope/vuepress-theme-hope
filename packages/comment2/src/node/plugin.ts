import type { PluginFunction } from "@vuepress/core";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import {
  addCustomElement,
  addViteOptimizeDepsExclude,
  addViteOptimizeDepsInclude,
  addViteSsrExternal,
  addViteSsrNoExternal,
  checkInstalled,
  checkVersion,
  getLocales,
} from "vuepress-shared/node";

import { getProvider } from "./alias.js";
import { convertOptions } from "./compact.js";
import { walineLocales } from "./locales.js";
import type { CommentPluginOptions } from "./options.js";
import { CLIENT_FOLDER, PLUGIN_NAME, getPackage, logger } from "./utils.js";

/** Comment Plugin */
export const commentPlugin =
  (options: CommentPluginOptions, legacy = true): PluginFunction =>
  (app) => {
    // TODO: Remove this in v2 stable
    if (legacy)
      convertOptions(options as CommentPluginOptions & Record<string, unknown>);
    checkVersion(app, PLUGIN_NAME, "2.0.0-rc.0");

    if (app.env.isDebug) logger.info("Options:", options);

    const pkg = getPackage(options.provider);

    if (pkg && !checkInstalled(pkg, import.meta.url)) {
      logger.error(
        `Package ${pkg} is not installed, please install it manually!`,
      );

      return { name: PLUGIN_NAME };
    }

    const userWalineLocales =
      options.provider === "Waline"
        ? getLocales({
            app,
            name: "waline",
            default: walineLocales,
            config: options.locales,
          })
        : {};

    // remove locales so that they won’t be injected in client twice
    if (options.provider === "Waline" && "locales" in options)
      delete options.locales;

    useSassPalettePlugin(app, { id: "hope" });

    return {
      name: PLUGIN_NAME,

      alias: {
        [`${PLUGIN_NAME}/provider`]: getProvider(options.provider),
      },

      define: () => ({
        COMMENT_OPTIONS: options,
        ...(options.provider === "Waline"
          ? {
              WALINE_LOCALES: userWalineLocales,
              WALINE_META: options.metaIcon !== false,
            }
          : {}),
      }),

      extendsBundlerOptions: (bundlerOptions: unknown, app): void => {
        switch (options.provider) {
          case "Artalk": {
            addViteOptimizeDepsExclude(
              bundlerOptions,
              app,
              "artalk/dist/Artalk.es.js",
            );
            addViteSsrExternal(bundlerOptions, app, "artalk");
            break;
          }

          case "Giscus": {
            addCustomElement(bundlerOptions, app, "GiscusWidget");
            addViteSsrExternal(bundlerOptions, app, "giscus");
            break;
          }

          case "Waline": {
            addViteOptimizeDepsInclude(bundlerOptions, app, "autosize");
            addViteOptimizeDepsExclude(bundlerOptions, app, "@waline/client");
            addViteSsrExternal(bundlerOptions, app, "@waline/client");
            break;
          }

          case "Twikoo": {
            addViteOptimizeDepsInclude(bundlerOptions, app, "twikoo");
            addViteSsrExternal(bundlerOptions, app, "twikoo");
            break;
          }
        }

        addViteSsrNoExternal(bundlerOptions, app, "vuepress-shared");
      },

      clientConfigFile: `${CLIENT_FOLDER}config.js`,
    };
  };

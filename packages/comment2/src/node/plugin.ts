import { getDirname, path } from "@vuepress/utils";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import {
  addCustomElement,
  addViteOptimizeDepsExclude,
  addViteOptimizeDepsInclude,
  addViteSsrExternal,
  getLocales,
  noopModule,
} from "vuepress-shared/node";

import { convertOptions } from "./compact.js";
import { walineLocales } from "./locales.js";
import { logger } from "./utils.js";

import type { CommentOptions } from "../shared/index.js";
import type { PluginFunction } from "@vuepress/core";

const __dirname = getDirname(import.meta.url);

/** Comment Plugin */
export const commentPlugin =
  (options: CommentOptions, legacy = false): PluginFunction =>
  (app) => {
    // TODO: Remove this in v2 stable
    if (legacy)
      convertOptions(options as CommentOptions & Record<string, unknown>);
    if (app.env.isDebug) logger.info("Options:", options);

    const provider =
      options.provider &&
      ["Giscus", "Waline", "Twikoo"].includes(options.provider)
        ? options.provider
        : "None";

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
      name: "vuepress-plugin-comment2",

      alias: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "vuepress-plugin-comment2/provider":
          provider === "None"
            ? noopModule
            : path.resolve(__dirname, `../client/components/${provider}.js`),
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
        if (provider === "Giscus") {
          addCustomElement(bundlerOptions, app, "GiscusWidget");
          addViteSsrExternal(bundlerOptions, app, "giscus");
        }

        if (provider === "Waline") {
          addViteOptimizeDepsInclude(bundlerOptions, app, "autosize");
          addViteOptimizeDepsExclude(bundlerOptions, app, "@waline/client");
          addViteSsrExternal(bundlerOptions, app, "@waline/client");
        }

        if (provider === "Twikoo") {
          addViteOptimizeDepsInclude(bundlerOptions, app, "twikoo");
          addViteSsrExternal(bundlerOptions, app, "twikoo");
        }
      },

      clientConfigFile: path.resolve(__dirname, "../client/config.js"),
    };
  };

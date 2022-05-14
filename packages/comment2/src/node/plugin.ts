import {
  addCustomElement,
  addViteSsrExternal,
  addViteOptimizeDepsExclude,
  addViteOptimizeDepsInclude,
  getLocales,
  noopModule,
} from "@mr-hope/vuepress-shared";
import { path } from "@vuepress/utils";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import { walineLocales } from "./locales";
import { logger } from "./utils";

import type { CommentOptions } from "../shared";
import type { PluginFunction } from "@vuepress/core";

/** Comment Plugin */
export const commentPlugin =
  (options: CommentOptions): PluginFunction =>
  (app) => {
    if (app.env.isDebug) logger.info(`Options: ${options.toString()}`);

    const isGiscus = options.type === "giscus";
    const isTwikoo = options.type === "twikoo";
    const isWaline = options.type === "waline";

    const userWalineLocales = isWaline
      ? getLocales({
          app,
          name: "waline",
          default: walineLocales,
          config: options.walineLocales,
        })
      : {};

    // remove locales so that they won’t be injected in client twice
    if ("walineLocales" in options) delete options.walineLocales;

    useSassPalettePlugin(app, { id: "hope" });

    return {
      name: "vuepress-plugin-comment2",

      alias: {
        "@Giscus": isGiscus
          ? path.resolve(__dirname, "../client/components/Giscus.js")
          : noopModule,
        "@Twikoo": isTwikoo
          ? path.resolve(__dirname, "../client/components/Twikoo.js")
          : noopModule,
        "@Waline": isWaline
          ? path.resolve(__dirname, "../client/components/Waline.js")
          : noopModule,
      },

      define: () => ({
        COMMENT_OPTIONS: options,
        WALINE_LOCALES: userWalineLocales,
      }),

      extendsBundlerOptions: (config: unknown, app): void => {
        if (isGiscus) addCustomElement({ app, config }, "GiscusWidget");

        if (isGiscus) {
          addViteSsrExternal({ app, config }, "giscus");
        }

        if (isTwikoo) {
          addViteOptimizeDepsInclude({ app, config }, "twikoo");
          addViteSsrExternal({ app, config }, "twikoo");
        }

        if (isWaline) {
          addViteOptimizeDepsInclude({ app, config }, "autosize");
          addViteOptimizeDepsExclude({ app, config }, "@waline/client");
        }
      },

      clientAppEnhanceFiles: path.resolve(__dirname, "../client/appEnhance.js"),
    };
  };

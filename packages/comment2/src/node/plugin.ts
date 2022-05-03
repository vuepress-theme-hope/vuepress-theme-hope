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

import type { CommentOptions } from "../shared";
import type { PluginFunction } from "@vuepress/core";

/** Comment Plugin */
export const commentPlugin =
  (options: CommentOptions): PluginFunction =>
  (app) => {
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

    // TODO: Wait for Vssue to support vue3
    // if (options.type === "vssue")
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    // app.use("@vssue/vuepress-plugin-vssue", options);

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

      extendsBundlerOptions: (config, app): void => {
        if (isGiscus) addCustomElement(config, app, "GiscusWidget");

        if (isGiscus) {
          addViteSsrExternal(config, app, "giscus");
        }

        if (isTwikoo) {
          addViteOptimizeDepsInclude(config, app, "twikoo");
          addViteSsrExternal(config, app, "twikoo");
        }

        if (isWaline) {
          addViteOptimizeDepsInclude(config, app, "hanabi");

          addViteOptimizeDepsExclude(config, app, "@waline/client");
        }
      },

      clientAppEnhanceFiles: path.resolve(__dirname, "../client/appEnhance.js"),
    };
  };

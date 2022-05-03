import {
  addCustomElement,
  addViteSsrExternal,
  addViteSsrNoExternal,
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

      onInitialized: (app): void => {
        if (isGiscus) addCustomElement(app, "GiscusWidget");

        addViteSsrNoExternal(app, [
          "@mr-hope/vuepress-shared",
          "vuepress-plugin-comment2",
        ]);
        addViteOptimizeDepsExclude(app, "vuepress-plugin-comment2");

        if (isGiscus) {
          addViteOptimizeDepsInclude(app, "giscus");
          addViteSsrExternal(app, "giscus");
        }

        if (isTwikoo) {
          addViteOptimizeDepsInclude(app, "twikoo");
          addViteSsrExternal(app, "twikoo");
        }

        if (isWaline) {
          addViteOptimizeDepsExclude(app, [
            "@waline/client/dist/component",
            "@waline/client/dist/pageview",
          ]);
          addViteOptimizeDepsInclude(app, ["autosize", "marked", "hanabi"]);
          addViteSsrNoExternal(app, "@waline/client");
        }
      },

      clientAppEnhanceFiles: path.resolve(__dirname, "../client/appEnhance.js"),
    };
  };

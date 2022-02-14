import {
  addViteOptimizeDeps,
  getLocales,
  noopModule,
} from "@mr-hope/vuepress-shared";
import { path } from "@vuepress/utils";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import { walineLocales } from "./locales";

import type { CommentOptions } from "../shared";
import type { Plugin, PluginConfig, PluginObject } from "@vuepress/core";

/** Comment Plugin */
export const commentPlugin: Plugin<CommentOptions> = (options, app) => {
  const isWaline = options.type === "waline";

  const userWalineLocales = isWaline
    ? getLocales(app, walineLocales, options.walineLocales)
    : {};

  // remove locales so that they won't be injected in client twice
  if ("walineLocales" in options) delete options.walineLocales;

  if (app.env.isDev)
    addViteOptimizeDeps(app, "@mr-hope/vuepress-shared/lib/client");

  if (isWaline) addViteOptimizeDeps(app, ["@waline/client"]);

  useSassPalettePlugin(app, { id: "hope" });

  const config: PluginObject = {
    name: "vuepress-plugin-comment2",

    alias: {
      "@Waline": isWaline
        ? path.resolve(__dirname, "../client/components/Waline.js")
        : noopModule,
    },

    define: () => ({
      COMMENT_OPTIONS: options,
      WALINE_LOCALES: userWalineLocales,
    }),

    clientAppEnhanceFiles: path.resolve(__dirname, "../client/appEnhance.js"),
  };

  // TODO: Wait for Vssue to support vue3
  // if (options.type === "vssue")
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  // config.plugins!.push(["@vssue/vuepress-plugin-vssue", options]);

  return config;
};

export const comment = (
  options: CommentOptions | false
): PluginConfig<CommentOptions> => ["comment2", options];

import {
  addViteOptimizeDeps,
  getLocales,
  noopModule,
} from "@mr-hope/vuepress-shared";
import { path } from "@vuepress/utils";
import { usePalettePlugin } from "vuepress-plugin-sass-palette";
import { walineLocales } from "./locales";

import type { CommentOptions } from "../shared";
import type { Plugin, PluginObject } from "@vuepress/core";

export * from "../shared";

/** Comment Plugin */
const commentPlugin: Plugin<CommentOptions> = (options, app) => {
  const userWalineLocales =
    options.type === "waline"
      ? getLocales(app, walineLocales, options.walineLocales)
      : {};

  // remove locales so that they won't be injected in client twice
  if ("walineLocales" in options) delete options.walineLocales;

  addViteOptimizeDeps(app, "@waline/client");

  usePalettePlugin(app, { id: "hope" });

  const config: PluginObject = {
    name: "vuepress-plugin-comment2",

    alias: {
      "@Waline":
        options.type === "waline"
          ? path.resolve(__dirname, "../client/components/Waline.js")
          : noopModule,
    },

    define: () => ({
      COMMENT_OPTIONS: options,
      WALINE_LOCALES: userWalineLocales,
    }),

    clientAppEnhanceFiles: path.resolve(__dirname, "../client/appEnhance.js"),
  };

  // TODO: Wait for Vssue to support `v2`
  // if (options.type === "vssue")
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  // config.plugins!.push(["@vssue/vuepress-plugin-vssue", options]);

  return config;
};

export default commentPlugin;

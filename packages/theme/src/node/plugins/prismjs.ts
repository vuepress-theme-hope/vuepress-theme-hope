import type { PrismjsPluginOptions } from "@vuepress/plugin-prismjs";
import type { App, Plugin } from "vuepress/core";
import { colors } from "vuepress/utils";

import { isHighlighterPlugin } from "./utils.js";
import { logger } from "../utils.js";

let prismjsPlugin: ((options: PrismjsPluginOptions) => Plugin) | null = null;

try {
  ({ prismjsPlugin } = await import("@vuepress/plugin-prismjs"));
} catch {
  // Do nothing
}

/**
 * @private
 *
 * Composition Api to use `@vuepress/plugin-prismjs`
 */
export const usePrismjsPlugin = (
  app: App,
  options: PrismjsPluginOptions = {},
): void => {
  const { plugins } = app.pluginApi;

  if (!prismjsPlugin) {
    logger.error(
      `${colors.cyan("@vuepress/plugin-prismjs")} is not installed!`,
    );

    return;
  }

  // Ensure highlighter plugin is not enabled
  if (plugins.every((plugin) => !isHighlighterPlugin(plugin)))
    app.use(prismjsPlugin(options));
};

/**
 * @private
 *
 * Composition Api to remove `@vuepress/plugin-prismjs`
 */
export const removePrismjsPlugin = (app: App): void => {
  const { plugins } = app.pluginApi;

  const index = plugins.findIndex(
    (plugin) => plugin.name === "@vuepress/plugin-prismjs",
  );

  if (index !== -1) app.pluginApi.plugins.splice(index, 1);
};

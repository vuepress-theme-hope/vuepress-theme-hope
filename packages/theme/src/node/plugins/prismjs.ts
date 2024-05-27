import { prismjsPlugin } from "@vuepress/plugin-prismjs";
import type { App } from "vuepress/core";
import { isPlainObject } from "vuepress/shared";

import type { PrismjsOptions } from "../../shared/index.js";
import { isHighlighterPlugin } from "./utils.js";

/**
 * @private
 *
 * Composition Api to use `@vuepress/plugin-prismjs`
 */
export const usePrismjsPlugin = (
  app: App,
  options?: PrismjsOptions | true,
): void => {
  const { plugins } = app.pluginApi;

  // Ensure highlighter plugin is not enabled
  if (plugins.every((plugin) => !isHighlighterPlugin(plugin)))
    app.use(prismjsPlugin(isPlainObject(options) ? options : {}));
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

import type { PrismjsPluginOptions } from "@vuepress/plugin-prismjs";
import type { App, Plugin } from "vuepress/core";

import { isHighlighterPlugin, logMissingPkg } from "./utils.js";

let prismjsPlugin: ((options: PrismjsPluginOptions) => Plugin) | null = null;

try {
  ({ prismjsPlugin } = await import("@vuepress/plugin-prismjs"));
} catch {
  // Do nothing
}

/**
 * Composition Api to use `@vuepress/plugin-prismjs`
 *
 * @param app - VuePress app instance
 * @param options - User options
 */
export const usePrismjsPlugin = (app: App, options: PrismjsPluginOptions = {}): void => {
  const { plugins } = app.pluginApi;

  if (!prismjsPlugin) {
    logMissingPkg("@vuepress/plugin-prismjs");

    return;
  }

  // Ensure highlighter plugin is not enabled
  if (plugins.every((plugin) => !isHighlighterPlugin(plugin))) app.use(prismjsPlugin(options));
};

/**
 * Composition Api to remove `@vuepress/plugin-prismjs`
 *
 * @param app - VuePress app instance
 */
export const removePrismjsPlugin = (app: App): void => {
  const { plugins } = app.pluginApi;

  const index = plugins.findIndex((plugin) => plugin.name === "@vuepress/plugin-prismjs");

  if (index !== -1) app.pluginApi.plugins.splice(index, 1);
};

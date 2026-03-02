import type { ShikiPluginOptions } from "@vuepress/plugin-shiki";
import { shikiPlugin } from "@vuepress/plugin-shiki";
import type { App } from "vuepress/core";

import { isHighlighterPlugin } from "./utils.js";

/**
 * Composition Api to use `@vuepress/plugin-shiki`
 *
 * @param app - VuePress app
 * @param options - Shiki plugin options
 */
export const useShikiPlugin = (app: App, options: ShikiPluginOptions = {}): void => {
  const { plugins } = app.pluginApi;

  // Ensure highlighter plugin is not enabled
  if (plugins.every((plugin) => !isHighlighterPlugin(plugin))) {
    app.use(
      shikiPlugin({
        ...("theme" in options
          ? {}
          : {
              themes: {
                light: "one-light",
                dark: "one-dark-pro",
              },
            }),
        ...options,
      }),
    );
  }
};

/**
 * Composition Api to remove `@vuepress/plugin-shiki`
 *
 * @param app - VuePress app
 */
export const removeShikiPlugin = (app: App): void => {
  const { plugins } = app.pluginApi;

  const index = plugins.findIndex((plugin) => plugin.name === "@vuepress/plugin-shiki");

  if (index !== -1) app.pluginApi.plugins.splice(index, 1);
};

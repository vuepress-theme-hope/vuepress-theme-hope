import type { ShikiPluginOptions } from "@vuepress/plugin-shiki";
import { shikiPlugin } from "@vuepress/plugin-shiki";
import type { App } from "vuepress/core";
import { isPlainObject } from "vuepress/shared";

import { isHighlighterPlugin } from "./utils.js";

/**
 * @private
 *
 * Composition Api to use `@vuepress/plugin-shiki`
 */
export const useShikiPlugin = (
  app: App,
  options?: ShikiPluginOptions | true,
): void => {
  const { plugins } = app.pluginApi;

  // Ensure highlighter plugin is not enabled
  if (plugins.every((plugin) => !isHighlighterPlugin(plugin)))
    app.use(
      shikiPlugin(
        isPlainObject(options)
          ? options
          : {
              themes: {
                light: "one-light",
                dark: "one-dark-pro",
              },
            },
      ),
    );
};

/**
 * @private
 *
 * Composition Api to remove `@vuepress/plugin-shiki`
 */
export const removeShikiPlugin = (app: App): void => {
  const { plugins } = app.pluginApi;

  const index = plugins.findIndex(
    (plugin) => plugin.name === "@vuepress/plugin-shiki",
  );

  if (index !== -1) app.pluginApi.plugins.splice(index, 1);
};

import { prismjsPlugin } from "@vuepress/plugin-prismjs";
import type { App } from "vuepress/core";

/**
 * @private
 *
 * Composition Api to use `@vuepress/plugin-prismjs`
 */
export const usePrismPlugin = (app: App): void => {
  const { plugins } = app.pluginApi;

  if (
    plugins.every(
      (plugin) =>
        // Ensure highlight plugin is not used
        plugin.name !== "@vuepress/plugin-prismjs" &&
        plugin.name !== "@vuepress/plugin-shiki",
    )
  )
    app.use(prismjsPlugin());
};

/**
 * @private
 *
 * Composition Api to remove `@vuepress/plugin-prismjs`
 */
export const removePrismPlugin = (app: App): void => {
  const { plugins } = app.pluginApi;

  const index = plugins.findIndex(
    (plugin) => plugin.name === "@vuepress/plugin-prismjs",
  );

  if (index !== -1) app.pluginApi.plugins.splice(index, 1);
};

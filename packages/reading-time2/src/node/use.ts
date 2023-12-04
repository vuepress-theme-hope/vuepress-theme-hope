import type { App } from "@vuepress/core";

import type { ReadingTimeOptions } from "./options.js";
import { readingTimePlugin } from "./plugin.js";

/**
 * Composition Api to use `vuepress-plugin-reading-time2`
 */
export const useReadingTimePlugin = (
  app: App,
  options: ReadingTimeOptions,
  legacy = true,
): void => {
  const { plugins } = app.pluginApi;

  if (
    plugins.every((plugin) => plugin.name !== "vuepress-plugin-reading-time2")
  )
    app.use(readingTimePlugin(options, legacy));
};

/**
 * Composition Api to remove `vuepress-plugin-reading-time2`
 */
export const removeReadingTimePlugin = (app: App): void => {
  const { plugins } = app.pluginApi;

  const index = plugins.findIndex(
    (plugin) => plugin.name === "vuepress-plugin-reading-time2",
  );

  if (index !== -1) app.pluginApi.plugins.splice(index, 1);
};

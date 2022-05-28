import { readingTimePlugin } from "./plugin";
import type { App } from "@vuepress/core";
import type { ReadingTimeOptions } from "../shared";

/**
 * Composition Api to use `vuepress-plugin-reading-time2`
 *
 * @description Should be invoke on node site
 */
export const useReadingTimePlugin = (
  app: App,
  options: ReadingTimeOptions
): void => {
  const plugins = app.pluginApi.plugins;

  if (
    plugins.every((plugin) => plugin.name !== "vuepress-plugin-reading-time2")
  )
    app.use(readingTimePlugin(options));
};

/**
 * Composition Api to remove `vuepress-plugin-reading-time2`
 *
 * @description Should be invoke on node site
 */
export const removeReadingTimePlugin = (app: App): void => {
  const plugins = app.pluginApi.plugins;

  const index = plugins.findIndex(
    (plugin) => plugin.name === "vuepress-plugin-reading-time2"
  );

  if (index !== -1) app.pluginApi.plugins.splice(index, 1);
};

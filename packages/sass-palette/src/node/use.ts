import { sassPalettePlugin } from "./plugin";

import type { App, PluginObject } from "@vuepress/core";
import type { SassPaletteOptions } from "../shared";

export const useSassPalettePlugin = (
  app: App,
  options: SassPaletteOptions
): void => {
  const plugins = app.pluginApi.plugins;

  if (
    plugins
      .filter<PluginObject & { id: string }>(
        (plugin): plugin is PluginObject & { id: string } =>
          plugin.name === `vuepress-plugin-sass-palette`
      )
      .every((plugin) => plugin.id !== options.id)
  )
    app.use(sassPalettePlugin(options));
};

export const removePalettePlugin = (app: App, id: string): void => {
  const plugins = app.pluginApi.plugins;

  const index = plugins
    .filter<PluginObject & { id: string }>(
      (plugin): plugin is PluginObject & { id: string } =>
        plugin.name === `vuepress-plugin-sass-palette`
    )
    .findIndex((plugin) => plugin.id === id);

  if (index !== -1) app.pluginApi.plugins.splice(index, 1);
};

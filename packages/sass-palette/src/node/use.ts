import type { App, PluginObject } from "vuepress/core";

import type { SassPaletteOptions } from "./options.js";
import { sassPalettePlugin } from "./plugin.js";

export const useSassPalettePlugin = (
  app: App,
  options: SassPaletteOptions,
): void => {
  const { plugins } = app.pluginApi;

  if (
    plugins
      .filter<
        PluginObject & { id: string }
      >((plugin): plugin is PluginObject & { id: string } => plugin.name === `vuepress-plugin-sass-palette`)
      .every((plugin) => plugin.id !== options.id)
  )
    app.use(sassPalettePlugin(options));
};

export const removePalettePlugin = (app: App, id: string): void => {
  const { plugins } = app.pluginApi;

  const index = plugins
    .filter<
      PluginObject & { id: string }
    >((plugin): plugin is PluginObject & { id: string } => plugin.name === `vuepress-plugin-sass-palette`)
    .findIndex((plugin) => plugin.id === id);

  if (index !== -1) app.pluginApi.plugins.splice(index, 1);
};

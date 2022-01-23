import { sassPalettePlugin } from "./plugin";

import type { App } from "@vuepress/core";
import type { SassPaletteOptions } from "../shared";

export const useSassPalettePlugin = (
  app: App,
  options: SassPaletteOptions
): void => {
  const plugins = app.pluginApi.plugins;

  if (
    plugins.every(
      (plugin) => plugin.name !== `vuepress-plugin-sass-palette?${options.id}`
    )
  )
    app.use(sassPalettePlugin, options);
};

export const removePalettePlugin = (app: App, id: string): void => {
  const plugins = app.pluginApi.plugins;

  const index = plugins.findIndex(
    (plugin) => plugin.name === `vuepress-plugin-sass-palette?${id}`
  );

  if (index !== -1) app.pluginApi.plugins.splice(index, 1);
};

import { palettePlugin } from "./palette";
import type { App } from "@vuepress/core";
import type { PaletteOptions } from "./options";

export const usePalettePlugin = (app: App, options: PaletteOptions): void => {
  const plugins = app.pluginApi.plugins;

  if (plugins.every((plugin) => plugin.name !== `palette-${options.id}`))
    app.use(palettePlugin, options);
};

export const removePalettePlugin = (app: App, id: string): void => {
  const plugins = app.pluginApi.plugins;

  const index = plugins.findIndex((plugin) => plugin.name === `palette-${id}`);

  if (index !== -1) app.pluginApi.plugins.splice(index, 1);
};

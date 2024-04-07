import type { App, PluginObject } from "vuepress/core";

export const removePalettePlugin = (app: App, id: string): void => {
  const { plugins } = app.pluginApi;

  const index = plugins
    .filter<
      PluginObject & { id: string }
    >((plugin): plugin is PluginObject & { id: string } => plugin.name === `vuepress-plugin-sass-palette`)
    .findIndex((plugin) => plugin.id === id);

  if (index !== -1) app.pluginApi.plugins.splice(index, 1);
};

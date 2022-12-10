import { gitPlugin } from "@vuepress/plugin-git";

import type { App } from "@vuepress/core";
import type { GitPluginOptions } from "@vuepress/plugin-git";

/**
 * Composition Api to use `@vuepress/plugin-git`
 *
 * @description Should be invoke on node site
 */
export const useGitPlugin = (
  app: App,
  options: GitPluginOptions | false
): void => {
  const plugins = app.pluginApi.plugins;

  if (
    plugins.every((plugin) => plugin.name !== "@vuepress/plugin-git") &&
    options
  )
    app.use(gitPlugin(options));
};

/**
 * Composition Api to remove `@vuepress/plugin-git`
 *
 * @description Should be invoke on node site
 */
export const removeGitPlugin = (app: App): void => {
  const plugins = app.pluginApi.plugins;

  const index = plugins.findIndex(
    (plugin) => plugin.name === "@vuepress/plugin-git"
  );

  if (index !== -1) app.pluginApi.plugins.splice(index, 1);
};

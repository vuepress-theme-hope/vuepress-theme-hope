import type { GitPluginOptions } from "@vuepress/plugin-git";
import { gitPlugin } from "@vuepress/plugin-git";
import type { App } from "vuepress/core";

/**
 * @private
 *
 * Composition Api to use `@vuepress/plugin-git`
 */
export const useGitPlugin = (
  app: App,
  options: GitPluginOptions | false,
): void => {
  const { plugins } = app.pluginApi;

  if (
    plugins.every((plugin) => plugin.name !== "@vuepress/plugin-git") &&
    options
  )
    app.use(gitPlugin(options));
};

/**
 * @private
 *
 * Composition Api to remove `@vuepress/plugin-git`
 */
export const removeGitPlugin = (app: App): void => {
  const { plugins } = app.pluginApi;

  const index = plugins.findIndex(
    (plugin) => plugin.name === "@vuepress/plugin-git",
  );

  if (index !== -1) app.pluginApi.plugins.splice(index, 1);
};

import type { GitPluginOptions } from "@vuepress/plugin-git";
import { gitPlugin } from "@vuepress/plugin-git";
import type { App } from "vuepress/core";
import { isPlainObject } from "vuepress/shared";

/**
 * @private
 *
 * Composition Api to use `@vuepress/plugin-git`
 */
export const useGitPlugin = (
  app: App,
  options: GitPluginOptions | boolean,
): void => {
  const { plugins } = app.pluginApi;

  if (
    plugins.every((plugin) => plugin.name !== "@vuepress/plugin-git") &&
    options
  )
    app.use(
      gitPlugin(
        isPlainObject(options)
          ? options
          : {
              createdTime: true,
              contributors: true,
              updatedTime: true,
            },
      ),
    );
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

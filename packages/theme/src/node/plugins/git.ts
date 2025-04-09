import { isPlainObject } from "@vuepress/helper";
import type { GitPluginOptions } from "@vuepress/plugin-git";
import { gitPlugin } from "@vuepress/plugin-git";
import type { App } from "vuepress/core";

import type { ThemeData } from "../../shared/index.js";

/**
 * @private
 *
 * Composition Api to use `@vuepress/plugin-git`
 */
export const useGitPlugin = (
  app: App,
  options: GitPluginOptions | boolean,
  themeData: ThemeData,
): void => {
  const { plugins } = app.pluginApi;

  if (
    plugins.every((plugin) => plugin.name !== "@vuepress/plugin-git") &&
    options
  ) {
    const defaultOptions = {
      createdTime: true,
      updatedTime: true,
      contributors: !Object.values(themeData.locales).every(
        ({ contributors }) => contributors === false,
      ),
      changelog:
        Object.values(themeData.locales).some(({ changelog }) => changelog) ||
        // @ts-expect-error: contributors can be existed here
        Boolean(themeData.changelog),
    };

    app.use(
      gitPlugin(
        isPlainObject(options)
          ? { ...defaultOptions, ...options }
          : defaultOptions,
      ),
    );
  }
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

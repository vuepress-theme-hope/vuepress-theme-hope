import { isPlainObject } from "@vuepress/shared";
import { useReadingTimePlugin } from "vuepress-plugin-reading-time2";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";

import { useGitPlugin } from "./git.js";
import { useExtendsPagePlugin } from "./pageConverter.js";
import { TEMPLATE_FOLDER } from "../utils.js";

import type { App } from "@vuepress/core";
import type { PluginsOptions } from "../../shared/index.js";

export const usePlugin = (
  app: App,
  plugins: PluginsOptions,
  legacy: boolean,
  hotReload: boolean
): void => {
  // respect git options
  if ("git" in plugins)
    useGitPlugin(
      app,
      "git" in plugins
        ? plugins.git === true
          ? {
              createdTime: true,
              contributors: true,
              updatedTime: true,
            }
          : plugins.git
        : {}
    );
  // only use git plugin in production or debug mode
  else if (hotReload || app.env.isBuild)
    useGitPlugin(app, {
      createdTime: true,
      contributors: true,
      updatedTime: true,
    });

  if (plugins.readingTime !== false)
    useReadingTimePlugin(
      app,
      isPlainObject(plugins.readingTime) ? plugins.readingTime : {}
    );

  useSassPalettePlugin(app, {
    id: "hope",
    config: ".vuepress/styles/config.scss",
    defaultConfig: `${TEMPLATE_FOLDER}config.scss`,
    defaultPalette: `${TEMPLATE_FOLDER}palette.scss`,
    generator: `${TEMPLATE_FOLDER}generator.scss`,
    palette: ".vuepress/styles/palette.scss",
    style: ".vuepress/styles/index.scss",
  });

  useExtendsPagePlugin(app, legacy);
};

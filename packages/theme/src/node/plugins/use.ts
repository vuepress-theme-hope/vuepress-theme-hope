import type { App } from "@vuepress/core";
import { useReadingTimePlugin } from "vuepress-plugin-reading-time2";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import { isPlainObject } from "vuepress-shared/node";

import { useGitPlugin } from "./git.js";
import { useExtendsPagePlugin } from "./pageConverter.js";
import { usePrismPlugin } from "./prism.js";
import type { PluginsOptions, ThemeData } from "../../shared/index.js";
import type { HopeThemeBehaviorOptions } from "../typings/index.js";
import { TEMPLATE_FOLDER } from "../utils.js";

/**
 * @private
 *
 * Use plugins to ensure they apply first
 */
export const usePlugin = (
  app: App,
  themeData: ThemeData,
  plugins: PluginsOptions,
  hotReload: boolean,
  behavior: HopeThemeBehaviorOptions,
  legacy = false,
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
        : {},
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
      isPlainObject(plugins.readingTime) ? plugins.readingTime : {},
      legacy,
    );

  if (plugins.prismjs !== false) usePrismPlugin(app);

  useSassPalettePlugin(app, {
    id: "hope",
    config: ".vuepress/styles/config.scss",
    defaultConfig: `${TEMPLATE_FOLDER}palette/config.scss`,
    palette: ".vuepress/styles/palette.scss",
    defaultPalette: `${TEMPLATE_FOLDER}palette/palette.scss`,
    generator: `${TEMPLATE_FOLDER}palette/generator.scss`,
    style: ".vuepress/styles/index.scss",
  });

  useExtendsPagePlugin(app, themeData, behavior);
};

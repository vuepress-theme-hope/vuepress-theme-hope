import { getDirname, path } from "@vuepress/utils";
import { useReadingTimePlugin } from "vuepress-plugin-reading-time2";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import { useGitPlugin } from "vuepress-shared/node";

import type { App } from "@vuepress/core";
import type { PluginsOptions } from "../../shared/index.js";

const __dirname = getDirname(import.meta.url);

export const usePlugin = (
  app: App,
  plugins: PluginsOptions,
  hotReload = false
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
      typeof plugins.readingTime === "object" ? plugins.readingTime : {}
    );

  useSassPalettePlugin(app, {
    id: "hope",
    config: ".vuepress/styles/config.scss",
    defaultConfig: path.resolve(__dirname, "../../../templates/config.scss"),
    defaultPalette: path.resolve(__dirname, "../../../templates/palette.scss"),
    generator: path.resolve(__dirname, "../../../templates/generator.scss"),
    palette: ".vuepress/styles/palette.scss",
    style: ".vuepress/styles/index.scss",
  });
};

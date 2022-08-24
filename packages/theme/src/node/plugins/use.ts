import { getDirname, path } from "@vuepress/utils";
import { useReadingTimePlugin } from "vuepress-plugin-reading-time2";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import { useGitPlugin } from "vuepress-shared";

import type { App } from "@vuepress/core";
import type { HopeThemePluginsOptions } from "../../shared/index.js";

const __dirname = getDirname(import.meta.url);

export const usePlugin = (app: App, plugins: HopeThemePluginsOptions): void => {
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
  else if (app.env.isDebug || app.env.isBuild)
    useGitPlugin(app, {
      createdTime: true,
      contributors: true,
      updatedTime: true,
    });

  useReadingTimePlugin(app, {
    wordPerMinute: plugins.readingTime?.wordPerMinute || 300,
  });

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

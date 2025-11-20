import { isPlainObject } from "@vuepress/helper";
import { useReadingTimePlugin } from "@vuepress/plugin-reading-time";
import { useSassPalettePlugin } from "@vuepress/plugin-sass-palette";
import type { App } from "vuepress/core";

import { useGitPlugin } from "./git.js";
import { useExtendsPagePlugin } from "./pageConverter.js";
import { usePrismjsPlugin } from "./prismjs.js";
import { useShikiPlugin } from "./shiki.js";
import type { ThemeData } from "../../shared/index.js";
import type {
  ThemeBehaviorOptions,
  ThemeMarkdownOptions,
  ThemePluginsOptions,
} from "../typings/index.js";
import { TEMPLATE_FOLDER } from "../utils.js";

/**
 * @private
 *
 * Use plugins to ensure they apply first
 */
// oxlint-disable-next-line max-params
export const usePlugins = (
  app: App,
  themeData: ThemeData,
  { highlighter }: ThemeMarkdownOptions,
  plugins: ThemePluginsOptions,
  hotReload: boolean,
  behavior: ThemeBehaviorOptions,
): void => {
  // Respect git options
  if (plugins.git) useGitPlugin(app, plugins.git, themeData);
  // Only use git plugin in production or debug mode
  else if (hotReload || app.env.isBuild) useGitPlugin(app, true, themeData);

  if (plugins.readingTime ?? true)
    useReadingTimePlugin(
      app,
      isPlainObject(plugins.readingTime) ? plugins.readingTime : {},
    );

  if (isPlainObject(highlighter)) {
    if (highlighter.type === "prismjs") usePrismjsPlugin(app, highlighter);
    else useShikiPlugin(app, highlighter);
  } else if (highlighter ?? true) {
    if (highlighter === "prismjs") {
      usePrismjsPlugin(app);
    } else {
      useShikiPlugin(app);
    }
  }

  useSassPalettePlugin(app, {
    id: "hope",
    config: ".vuepress/styles/config.scss",
    defaultConfig: `${TEMPLATE_FOLDER}/palette/config.scss`,
    palette: ".vuepress/styles/palette.scss",
    defaultPalette: `${TEMPLATE_FOLDER}/palette/palette.scss`,
    generator: `${TEMPLATE_FOLDER}/palette/generator.scss`,
    style: ".vuepress/styles/index.scss",
  });

  useExtendsPagePlugin(app, themeData, behavior);
};

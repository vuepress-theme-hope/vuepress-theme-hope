import { isPlainObject } from "@vuepress/helper";
import { watch } from "chokidar";
import type { ThemeFunction } from "vuepress/core";
import { TemplateRendererOutlet, path } from "vuepress/utils";

import {
  checkThemeMarkdownOptions,
  checkUserPlugins,
  checkVuePressMarkdownOptions,
  checkVuePressVersion,
} from "./check/index.js";
import { checkLegacyStyle, convertThemeOptions } from "./compact/index.js";
import {
  getSocialMediaIcons,
  getThemeData,
  getThemeStatus,
} from "./config/index.js";
import { extendsBundlerOptions } from "./extendsBundlerOptions.js";
import { addFavicon } from "./init/index.js";
import { getPlugins, usePlugins } from "./plugins/index.js";
import {
  prepareConfigFile,
  prepareHighLighterScss,
  prepareSidebarData,
  prepareSocialMediaIcons,
} from "./prepare/index.js";
import type { ThemeBehaviorOptions, ThemeOptions } from "./typings/index.js";
import { CLIENT_FOLDER, TEMPLATE_FOLDER, VERSION, logger } from "./utils.js";

const BEHAVIOR_DEFAULTS = {
  check: true,
  compact: true,
  checkVuePress: true,
};

/**
 * VuePress Theme Hope
 *
 * @param themeOptions - theme options
 * @param behaviorOptions - theme behavior options
 */
export const hopeTheme = (
  themeOptions: ThemeOptions,
  // TODO: Change default value in v2 stable
  behaviorOptions: ThemeBehaviorOptions | boolean = true,
): ThemeFunction => {
  const behavior: ThemeBehaviorOptions = isPlainObject(behaviorOptions)
    ? { ...BEHAVIOR_DEFAULTS, ...behaviorOptions }
    : behaviorOptions
      ? BEHAVIOR_DEFAULTS
      : {};

  if (behavior.checkVuePress) checkVuePressVersion();

  return (app) => {
    const isDebug = behavior.debug ? (app.env.isDebug = true) : app.env.isDebug;

    const {
      favicon,
      hotReload = isDebug,
      markdown = {},
      plugins = {},
      hostname,
      sidebarSorter,
      ...mainThemeOptions
    } = behavior.compact
      ? // eslint-disable-next-line @typescript-eslint/no-deprecated
        convertThemeOptions(
          themeOptions as ThemeOptions & Record<string, unknown>,
        )
      : themeOptions;

    // eslint-disable-next-line @typescript-eslint/no-deprecated
    if (behavior.compact) checkLegacyStyle(app);

    const status = getThemeStatus(app, themeOptions);
    const themeData = getThemeData(app, mainThemeOptions, status);
    const icons = status.enableBlog ? getSocialMediaIcons(themeData) : null;

    checkVuePressMarkdownOptions(app.options.markdown, markdown);
    usePlugins(app, themeData, markdown, plugins, hotReload, behavior);

    if (isDebug) logger.info("Plugin options:", plugins);

    return {
      name: "vuepress-theme-hope",

      alias: behavior.custom
        ? { "@theme-hope": path.resolve(CLIENT_FOLDER) }
        : undefined,

      define: () => ({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        __VP_CUSTOM__: behavior.custom ?? false,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        __VP_BLOG_TYPES__: status.blogTypes,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        __VP_I18N__: status.isI18nProject,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        __VP_READING_TIME__: status.enableReadingTime,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        __VP_REPO__: status.hasRepo,
      }),

      extendsBundlerOptions: (bundlerConfig, app): void => {
        extendsBundlerOptions(bundlerConfig, app, behavior.custom);
      },

      extendsMarkdownOptions: (markdownOptions): void => {
        checkThemeMarkdownOptions(markdownOptions, markdown);
      },

      onInitialized: (app): void => {
        if (favicon) addFavicon(app, favicon);
        if (behavior.check) checkUserPlugins(app);
      },

      onPrepared: async (app): Promise<void> => {
        await Promise.all([
          prepareSidebarData(app, themeData, sidebarSorter),
          prepareHighLighterScss(app),
          prepareSocialMediaIcons(app, icons),
        ]);
      },

      onWatched: (app, watchers): void => {
        if (hotReload) {
          // This ensure the page is generated or updated
          const structureSidebarWatcher = watch("pages", {
            cwd: app.dir.temp(),
            ignoreInitial: true,
            // only watch vue files
            ignored: (path, stats) =>
              Boolean(stats?.isFile() && !path.endsWith(".vue")),
          });

          structureSidebarWatcher.on("add", () => {
            void prepareSidebarData(app, themeData, sidebarSorter);
          });
          structureSidebarWatcher.on("change", () => {
            void prepareSidebarData(app, themeData, sidebarSorter);
          });
          structureSidebarWatcher.on("unlink", () => {
            void prepareSidebarData(app, themeData, sidebarSorter);
          });

          watchers.push(structureSidebarWatcher);
        }
      },

      plugins: getPlugins(
        app,
        themeData,

        {
          markdown,
          plugins,
          hostname,
          hotReload,
          favicon,
        },
        behavior.compact,
      ),

      templateBuild: `${TEMPLATE_FOLDER}/index.build.html`,

      templateBuildRenderer: (
        template: string,
        { content, head, lang, prefetch, preload, scripts, styles, version },
      ): string =>
        template
          .replace(TemplateRendererOutlet.Content, () => content)
          .replace(TemplateRendererOutlet.Head, head)
          .replace("{{ themeVersion }}", VERSION)
          .replace(
            "{{ themeMode }}",
            mainThemeOptions.darkmode === "enable" ? "dark" : "light",
          )
          .replace(TemplateRendererOutlet.Lang, lang)
          .replace(TemplateRendererOutlet.Prefetch, prefetch)
          .replace(TemplateRendererOutlet.Preload, preload)
          .replace(TemplateRendererOutlet.Scripts, scripts)
          .replace(TemplateRendererOutlet.Styles, styles)
          .replace(TemplateRendererOutlet.Version, version),

      clientConfigFile: (app) => prepareConfigFile(app, status, behavior),
    };
  };
};

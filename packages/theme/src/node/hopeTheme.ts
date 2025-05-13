import { isPlainObject } from "@vuepress/helper";
import { watch } from "chokidar";
import type { ThemeFunction } from "vuepress/core";
import { TEMPLATE_RENDERER_OUTLETS, path } from "vuepress/utils";

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
  prepareBundleConfigFile,
  prepareCustomConfigFile,
  prepareHighLighterScss,
  prepareSidebarData,
  prepareSocialMediaIcons,
} from "./prepare/index.js";
import type { HopeThemeBehaviorOptions } from "./typings/index.js";
import { CLIENT_FOLDER, TEMPLATE_FOLDER, VERSION, logger } from "./utils.js";
import type { ThemeOptions } from "../shared/index.js";

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
  behaviorOptions: HopeThemeBehaviorOptions | boolean = true,
): ThemeFunction => {
  const behavior: HopeThemeBehaviorOptions = isPlainObject(behaviorOptions)
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

      extendsBundlerOptions: (bundlerConfig, app) =>
        extendsBundlerOptions(bundlerConfig, app, behavior.custom),

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
          const structureSidebarWatcher = watch(
            // This ensures the page is generated or updated
            "pages/**/*.vue",
            {
              cwd: app.dir.temp(),
              ignoreInitial: true,
            },
          );

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
          .replace(TEMPLATE_RENDERER_OUTLETS.CONTENT, () => content)
          .replace(TEMPLATE_RENDERER_OUTLETS.HEAD, head)
          .replace("{{ themeVersion }}", VERSION)
          .replace(
            "{{ themeMode }}",
            mainThemeOptions.darkmode === "enable" ? "dark" : "light",
          )
          .replace(TEMPLATE_RENDERER_OUTLETS.LANG, lang)
          .replace(TEMPLATE_RENDERER_OUTLETS.PREFETCH, prefetch)
          .replace(TEMPLATE_RENDERER_OUTLETS.PRELOAD, preload)
          .replace(TEMPLATE_RENDERER_OUTLETS.SCRIPTS, scripts)
          .replace(TEMPLATE_RENDERER_OUTLETS.STYLES, styles)
          .replace(TEMPLATE_RENDERER_OUTLETS.VERSION, version),

      clientConfigFile: (app) =>
        (behavior.custom ? prepareCustomConfigFile : prepareBundleConfigFile)(
          app,
          status,
        ),
    };
  };
};

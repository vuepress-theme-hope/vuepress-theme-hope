import { isPlainObject } from "@vuepress/helper";
import { watch } from "chokidar";
import type { ThemeFunction } from "vuepress/core";
import { TEMPLATE_RENDERER_OUTLETS } from "vuepress/utils";

import {
  checkMarkdownOptions,
  checkUserPlugins,
  checkVuePressVersion,
} from "./check/index.js";
import { checkLegacyStyle, convertThemeOptions } from "./compact/index.js";
import {
  getSocialMediaIcons,
  getThemeData,
  getThemeStatus,
} from "./config/index.js";
import { extendsBundlerOptions } from "./extendsBundlerOptions.js";
import { getAlias } from "./getAlias.js";
import { addFavicon } from "./init/index.js";
import { getPlugins, usePlugins } from "./plugins/index.js";
import {
  prepareBundleConfigFile,
  prepareHighLighterScss,
  prepareSeparatedConfigFile,
  prepareSidebarData,
  prepareSocialMediaIcons,
} from "./prepare/index.js";
import type { HopeThemeBehaviorOptions } from "./typings/index.js";
import { TEMPLATE_FOLDER, VERSION } from "./utils.js";
import type { ThemeOptions } from "../shared/index.js";

export const hopeTheme = (
  options: ThemeOptions,
  // TODO: Change default value in v2 stable
  behavior: HopeThemeBehaviorOptions | boolean = true,
): ThemeFunction => {
  checkVuePressVersion();

  return (app) => {
    const behaviorOptions: HopeThemeBehaviorOptions = isPlainObject(behavior)
      ? { compact: true, check: true, ...behavior }
      : behavior
        ? { compact: true, check: true }
        : {};
    const isDebug = behaviorOptions.debug
      ? (app.env.isDebug = true)
      : app.env.isDebug;

    const {
      favicon,
      hotReload = isDebug,
      markdown = {},
      plugins = {},
      hostname,
      sidebarSorter,
      preserveHeader,
      ...themeOptions
    } = behaviorOptions.compact
      ? // eslint-disable-next-line @typescript-eslint/no-deprecated
        convertThemeOptions(options as ThemeOptions & Record<string, unknown>)
      : options;

    // eslint-disable-next-line @typescript-eslint/no-deprecated
    if (behaviorOptions.compact) checkLegacyStyle(app);

    const status = getThemeStatus(app, options);
    const themeData = getThemeData(app, themeOptions, status);
    const icons = status.enableBlog ? getSocialMediaIcons(themeData) : null;

    usePlugins(app, themeData, markdown, plugins, hotReload, behaviorOptions);

    if (isDebug) console.log("Theme plugin options:", plugins);

    return {
      name: "vuepress-theme-hope",

      alias: behaviorOptions.custom ? getAlias(isDebug) : {},

      define: () => ({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        __VP_BLOG__: status.enableBlog,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        __VP_BLOG_TYPES__: status.blogType,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        __VP_MULTI_LANGUAGES__: status.hasMultipleLanguages,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        __VP_READING_TIME__: status.enableReadingTime,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        __VP_REPO__: status.hasRepo,
      }),

      extendsBundlerOptions,

      extendsMarkdownOptions: (markdownOptions): void => {
        if (behaviorOptions.check)
          checkMarkdownOptions(markdownOptions, themeData);
      },

      extendsPage: (page): void => {
        if (!preserveHeader) {
          // @ts-expect-error: headers exists in original types
          delete page.data.headers;
        }
      },

      onInitialized: (app): void => {
        if (favicon) addFavicon(app, favicon);
        if (behaviorOptions.check) checkUserPlugins(app);
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

        // @ts-expect-error: hostname might not exist
        {
          markdown,
          plugins,
          hostname,
          hotReload,
          favicon,
        },
        behaviorOptions.compact,
      ),

      templateBuild: `${TEMPLATE_FOLDER}index.build.html`,

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
            themeOptions.darkmode === "enable" ? "dark" : "light",
          )
          .replace(TEMPLATE_RENDERER_OUTLETS.LANG, lang)
          .replace(TEMPLATE_RENDERER_OUTLETS.PREFETCH, prefetch)
          .replace(TEMPLATE_RENDERER_OUTLETS.PRELOAD, preload)
          .replace(TEMPLATE_RENDERER_OUTLETS.SCRIPTS, scripts)
          .replace(TEMPLATE_RENDERER_OUTLETS.STYLES, styles)
          .replace(TEMPLATE_RENDERER_OUTLETS.VERSION, version),

      clientConfigFile: (app) =>
        behaviorOptions.custom
          ? prepareSeparatedConfigFile(app, status)
          : prepareBundleConfigFile(app, status),
    };
  };
};

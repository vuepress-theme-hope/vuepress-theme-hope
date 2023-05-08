import { type ThemeFunction } from "@vuepress/core";
import { watch } from "chokidar";
import { isPlainObject } from "vuepress-shared/node";

import { getAlias } from "./alias.js";
import { extendsBundlerOptions } from "./bundler.js";
import {
  checkHeader,
  checkUserPlugin,
  checkVuePressVersion,
} from "./check/index.js";
import { checkLegacyStyle, convertThemeOptions } from "./compact/index.js";
import {
  checkSocialMediaIcons,
  getStatus,
  getThemeData,
} from "./config/index.js";
import { addFavicon } from "./init/index.js";
import { getPluginConfig, usePlugin } from "./plugins/index.js";
import {
  prepareBundleConfigFile,
  prepareHighLighterScss,
  prepareSeparatedConfigFile,
  prepareSidebarData,
  prepareSocialMediaIcons,
} from "./prepare/index.js";
import { type HopeThemeBehaviorOptions } from "./typings/index.js";
import { TEMPLATE_FOLDER } from "./utils.js";
import { type ThemeOptions } from "../shared/index.js";

export const hopeTheme =
  (
    options: ThemeOptions,
    // TODO: Change default value in v2 stable
    behavior: HopeThemeBehaviorOptions | boolean = true
  ): ThemeFunction =>
  (app) => {
    const behaviorOptions = isPlainObject(behavior)
      ? behavior
      : behavior
      ? { compact: true, check: true }
      : {};
    const isDebug = behaviorOptions.debug ? (app.env.isDebug = true) : false;

    const {
      favicon,
      hotReload = isDebug,
      plugins = {},
      hostname,
      iconAssets,
      iconPrefix,
      backToTop,
      sidebarSorter,
      ...themeOptions
    } = behaviorOptions.compact
      ? convertThemeOptions(options as ThemeOptions & Record<string, unknown>)
      : options;

    if (behaviorOptions.compact) checkLegacyStyle(app);

    checkVuePressVersion(app);

    const status = getStatus(app, options);
    const themeData = getThemeData(app, themeOptions, status);
    const icons = status.enableBlog ? checkSocialMediaIcons(themeData) : {};

    usePlugin(app, themeData, plugins, hotReload, behaviorOptions);

    if (isDebug) console.log("Theme plugin options:", plugins);

    return {
      name: "vuepress-theme-hope",

      alias: behaviorOptions.custom ? getAlias(isDebug) : {},

      define: () => ({
        BLOG_TYPE_INFO: status.blogType,
        ENABLE_BLOG: status.enableBlog,
        ENABLE_READING_TIME: status.enableReadingTime,
        HAS_MULTIPLE_LANGUAGES: status.hasMultipleLanguages,
        SUPPORT_PAGEVIEW: status.supportPageview,
      }),

      extendsBundlerOptions,

      extendsMarkdownOptions: (markdownOptions): void => {
        if (behaviorOptions.check) checkHeader(markdownOptions, themeData);
      },

      onInitialized: (app): void => {
        if (favicon) addFavicon(app, favicon);
        if (behaviorOptions.check) checkUserPlugin(app);
      },

      onPrepared: (app): Promise<void> =>
        Promise.all([
          prepareSidebarData(app, themeData, sidebarSorter),
          prepareHighLighterScss(app, plugins),
          prepareSocialMediaIcons(app, icons),
        ]).then(() => void 0),

      onWatched: (app, watchers): void => {
        if (hotReload) {
          // this ensure the page is generated or updated
          const structureSidebarWatcher = watch("pages/**/*.vue", {
            cwd: app.dir.temp(),
            ignoreInitial: true,
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

      plugins: getPluginConfig(
        app,
        plugins,
        themeData,

        // @ts-ignore
        {
          backToTop,
          hostname,
          hotReload,
          iconAssets,
          iconPrefix,
          favicon,
        },
        behaviorOptions.compact
      ),

      templateBuild: `${TEMPLATE_FOLDER}index.build.html`,

      clientConfigFile: (app) =>
        behaviorOptions.custom
          ? prepareSeparatedConfigFile(app, status)
          : prepareBundleConfigFile(app, status),
    };
  };

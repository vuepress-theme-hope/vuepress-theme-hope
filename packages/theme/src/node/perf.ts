import { type ThemeFunction } from "@vuepress/core";
import { watch } from "chokidar";

import { extendsBundlerOptions } from "../node/bundler.js";
import {
  checkSocialMediaIcons,
  getStatus,
  getThemeData,
} from "../node/config/index.js";
import { getPluginConfig, usePlugin } from "../node/plugins/index.js";
import {
  prepareHighLighterScss,
  preparePerformanceConfigFile,
  prepareSidebarData,
  prepareSocialMediaIcons,
  prepareThemeColorScss,
} from "../node/prepare/index.js";
import { TEMPLATE_FOLDER } from "../node/utils.js";
import { type ThemeOptions } from "../shared/index.js";

export const hopeTheme =
  (options: ThemeOptions): ThemeFunction =>
  (app) => {
    const { isDebug } = app.env;
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
    } = options;

    const status = getStatus(app, options);
    const themeData = getThemeData(app, themeOptions, status);
    const icons = status.enableBlog ? checkSocialMediaIcons(themeData) : {};

    usePlugin(app, themeData, plugins, hotReload);

    if (isDebug) console.log("Theme plugin options:", plugins);

    return {
      name: "vuepress-theme-hope",

      define: () => ({
        BLOG_TYPE_INFO: status.blogType,
        ENABLE_BLOG: status.enableBlog,
        ENABLE_READING_TIME: status.enableReadingTime,
        HAS_MULTIPLE_LANGUAGES: status.hasMultipleLanguages,
        SUPPORT_PAGEVIEW: status.supportPageview,
      }),

      extendsBundlerOptions,

      onInitialized: (app): void => {
        if (favicon) {
          const { base, head } = app.options;
          const faviconLink = favicon.replace(/^\/?/, base);

          // ensure favicon is not injected
          if (
            head.every(
              ([tag, attrs]) =>
                !(
                  tag === "link" &&
                  attrs["rel"] === "icon" &&
                  attrs["href"] === faviconLink
                )
            )
          )
            head.push(["link", { rel: "icon", href: faviconLink }]);
        }
      },

      onPrepared: (app): Promise<void> =>
        Promise.all([
          prepareSidebarData(app, themeData, sidebarSorter),
          prepareHighLighterScss(app, plugins),
          prepareThemeColorScss(app, themeData),
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
        }
      ),

      templateBuild: `${TEMPLATE_FOLDER}index.build.html`,

      clientConfigFile: (app) => preparePerformanceConfigFile(app, status),
    };
  };

export * from "../node/helpers.js";
export * from "../node/locales/index.js";
export * from "../shared/index.js";

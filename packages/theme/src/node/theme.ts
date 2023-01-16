import { watch } from "chokidar";

import { resolveAlias } from "./alias.js";
import { extendsBundlerOptions } from "./bundler.js";
import { checkStyle, convertThemeOptions } from "./compact/index.js";
import {
  checkSocialMediaIcons,
  getStatus,
  getThemeData,
} from "./config/index.js";
import { checkPlugins, getPluginConfig, usePlugin } from "./plugins/index.js";
import {
  prepareConfigFile,
  prepareSidebarData,
  prepareSocialMediaIcons,
  prepareThemeColorScss,
} from "./prepare/index.js";
import { TEMPLATE_FOLDER } from "./utils.js";

import type { ThemeFunction } from "@vuepress/core";
import type { ThemeOptions } from "../shared/index.js";

export const hopeTheme =
  (
    options: ThemeOptions,
    // TODO: Remove this in v2 stable
    legacy = false
  ): ThemeFunction =>
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
    } = legacy
      ? convertThemeOptions(options as ThemeOptions & Record<string, unknown>)
      : options;

    if (legacy) checkStyle(app);

    checkPlugins(app, plugins);

    const status = getStatus(app, options);
    const themeConfig = getThemeData(app, themeOptions, status);
    const icons = status.enableBlog ? checkSocialMediaIcons(themeConfig) : {};

    usePlugin(app, plugins, legacy, hotReload);

    if (isDebug) console.log("Theme plugin options:", plugins);

    return {
      name: "vuepress-theme-hope",

      alias: resolveAlias(isDebug),

      define: () => ({
        BLOG_TYPE_INFO: status.blogType,
        ENABLE_BLOG: status.enableBlog,
        ENABLE_READING_TIME: status.enableReadingTime,
        HAS_MULTIPLE_LANGUAGES: status.hasMultipleLanguages,
        SUPPORT_PAGEVIEW: status.supportPageview,
      }),

      extendsBundlerOptions,

      onInitialized: (): void => {
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

      onPrepared: (): Promise<void> =>
        Promise.all([
          prepareSidebarData(app, themeConfig, sidebarSorter),
          prepareThemeColorScss(app, themeConfig),
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
            void prepareSidebarData(app, themeConfig, sidebarSorter);
          });
          structureSidebarWatcher.on("change", () => {
            void prepareSidebarData(app, themeConfig, sidebarSorter);
          });
          structureSidebarWatcher.on("unlink", () => {
            void prepareSidebarData(app, themeConfig, sidebarSorter);
          });

          watchers.push(structureSidebarWatcher);
        }
      },

      plugins: getPluginConfig(
        app,
        plugins,
        themeConfig,

        // @ts-ignore
        {
          backToTop,
          hostname,
          hotReload,
          iconAssets,
          iconPrefix,
          favicon,
        },
        legacy
      ),

      templateBuild: `${TEMPLATE_FOLDER}index.build.html`,

      clientConfigFile: (app) => prepareConfigFile(app, status),
    };
  };

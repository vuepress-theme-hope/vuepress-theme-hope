import { getDirname, path } from "@vuepress/utils";
import { watch } from "chokidar";

import { resolveAlias } from "./alias.js";
import { extendsBundlerOptions } from "./bundler.js";
import {
  checkStyle,
  convertFrontmatter,
  convertThemeConfig,
} from "./compact/index.js";
import { extendsPage } from "./extendsPage.js";
import { checkFrontmatter } from "./frontmatter/index.js";
import { getPluginConfig, usePlugin } from "./plugins/index.js";
import {
  prepareConfigFile,
  prepareSidebarData,
  prepareSocialMediaIcons,
} from "./prepare/index.js";
import { checkSocialMediaIcons } from "./socialMedia.js";
import { getStatus } from "./status.js";
import { getThemeConfig } from "./themeConfig.js";
import { prepareThemeColorScss } from "./themeColor.js";

import type { Page, ThemeFunction } from "@vuepress/core";
import type { ThemeOptions, ThemePageData } from "../shared/index.js";

const __dirname = getDirname(import.meta.url);

export const hopeTheme =
  (
    options: ThemeOptions,
    // TODO: Remove this in v2 stable
    legacy = false
  ): ThemeFunction =>
  (app) => {
    const { isDebug } = app.env;
    const {
      hotReload = isDebug,
      plugins = {},
      hostname,
      iconAssets,
      iconPrefix,
      addThis,
      backToTop,
      sidebarSorter,
      ...themeOptions
    } = legacy
      ? convertThemeConfig(options as ThemeOptions & Record<string, unknown>)
      : options;

    if (legacy) checkStyle(app);

    const status = getStatus(app, options);
    const themeConfig = getThemeConfig(app, themeOptions, status);
    const icons = status.enableBlog ? checkSocialMediaIcons(themeConfig) : {};

    const isAppInitialized = false;

    usePlugin(app, plugins);

    if (isDebug) console.log("Theme plugin options:", plugins);

    return {
      name: "vuepress-theme-hope",

      alias: resolveAlias(isDebug),

      define: () => ({
        ENABLE_BLOG: status.enableBlog,
        ENABLE_READING_TIME: status.enableReadingTime,
        HAS_MULTIPLE_LANGUAGES: status.hasMultipleLanguages,
        SUPPORT_PAGEVIEW: status.supportPageview,
      }),

      extendsBundlerOptions,

      extendsPage: (page): void => {
        if (legacy)
          page.frontmatter = convertFrontmatter(
            page.frontmatter,
            page.filePathRelative || ""
          );

        checkFrontmatter(page, app.env.isDebug);

        extendsPage(
          themeConfig,
          plugins,
          <Page<ThemePageData>>page,
          isAppInitialized
        );
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
          const searchIndexWatcher = watch("pages/**/*.vue", {
            cwd: app.dir.temp(),
            ignoreInitial: true,
          });

          searchIndexWatcher.on("add", () => {
            void prepareSidebarData(app, themeConfig, sidebarSorter);
          });
          searchIndexWatcher.on("change", () => {
            void prepareSidebarData(app, themeConfig, sidebarSorter);
          });
          searchIndexWatcher.on("unlink", () => {
            void prepareSidebarData(app, themeConfig, sidebarSorter);
          });

          watchers.push(searchIndexWatcher);
        }
      },

      plugins: getPluginConfig(
        plugins,
        themeConfig,

        // @ts-ignore
        {
          addThis,
          backToTop,
          hostname,
          iconAssets,
          iconPrefix,
        },
        legacy
      ),

      templateBuild: path.resolve(
        __dirname,
        "../../templates/index.build.html"
      ),

      clientConfigFile: (app) => prepareConfigFile(app, plugins, status),
    };
  };

export const hope = hopeTheme;

import { getDirname, path } from "@vuepress/utils";

import { resolveAlias } from "./alias.js";
import { updateBundlerConfig } from "./bundler.js";
import { extendsPage } from "./extendsPage.js";
import {
  checkStyle,
  convertFrontmatter,
  convertThemeConfig,
} from "./compact/index.js";
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
import type { HopeThemeOptions, HopeThemePageData } from "../shared/index.js";

const __dirname = getDirname(import.meta.url);

export const hopeTheme =
  (
    options: HopeThemeOptions,
    // TODO: remove this option in stable release
    legacy = false
  ): ThemeFunction =>
  (app) => {
    const {
      plugins = {},
      hostname,
      iconAssets,
      iconPrefix,
      addThis,
      backToTop,
      sidebarSorter,
      ...themeOptions
    } = legacy
      ? convertThemeConfig(
          options as HopeThemeOptions & Record<string, unknown>
        )
      : options;

    if (legacy) checkStyle(app);

    const status = getStatus(options);
    const themeConfig = getThemeConfig(app, themeOptions, status);
    const icons = status.enableBlog ? checkSocialMediaIcons(themeConfig) : {};

    usePlugin(app, plugins);

    if (app.env.isDebug) console.log("Theme plugin options:", plugins);

    return {
      name: "vuepress-theme-hope",

      alias: resolveAlias(app.env.isDebug),

      define: () => ({
        ENABLE_BLOG: status.enableBlog,
        ENABLE_VISITOR: status.enableVisitor,
      }),

      extendsBundlerOptions: (config: unknown, app): void =>
        updateBundlerConfig(config, app),

      extendsPage: (page): void => {
        if (legacy)
          page.frontmatter = convertFrontmatter(
            page.frontmatter,
            page.filePathRelative || ""
          );

        extendsPage(
          themeConfig,
          plugins,
          <Page<HopeThemePageData>>page,
          app.env.isDev
        );
      },

      onPrepared: (): Promise<void> =>
        Promise.all([
          prepareSidebarData(app, themeConfig, sidebarSorter),
          prepareThemeColorScss(app, themeConfig),
          prepareSocialMediaIcons(app, icons),
        ]).then(() => void 0),

      plugins: getPluginConfig(
        plugins,
        themeConfig,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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

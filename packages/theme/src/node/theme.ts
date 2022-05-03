import { path } from "@vuepress/utils";

import { updateBundlerConfig } from "./bundler";
import { extendsPage } from "./extendsPage";
import { getThemeConfig } from "./themeConfig";
import { getLayoutConfig } from "./layout";
import { getPluginConfig, usePlugin } from "./plugins";
import { checkSocialMediaIcons } from "./socialMedia";
import { prepareSidebarData } from "./sidebar";
import { prepareThemeColorScss } from "./themeColor";
import { resolveAlias } from "./alias";

import type { Page, ThemeFunction } from "@vuepress/core";
import type { HopeThemeOptions, HopeThemePageData } from "../shared";

export const hopeTheme =
  ({
    plugins = {},
    hostname = "",
    ...themeOptions
  }: HopeThemeOptions): ThemeFunction =>
  (app) => {
    const enableBlog = Boolean(plugins.blog);
    const themeConfig = getThemeConfig(app, themeOptions, enableBlog);

    usePlugin(app, plugins);

    if (enableBlog) {
      const icons = checkSocialMediaIcons(themeConfig);

      void app.writeTemp(
        `theme-hope/socialMedia.js`,
        `export const icons = ${JSON.stringify(icons)}`
      );
    }

    return {
      name: "vuepress-theme-hope",

      alias: resolveAlias(app.env.isDebug),

      define: () => ({
        ENABLE_BLOG: enableBlog,
        ENABLE_VISITOR: Boolean(
          plugins.comment && plugins.comment.type === "waline"
        ),
      }),

      extendsBundlerOptions: (config, app): void =>
        updateBundlerConfig(config, app),

      extendsPage: (page) =>
        extendsPage(
          themeConfig,
          plugins,
          page as Page<HopeThemePageData>,
          app.env.isDev
        ),

      onPrepared: (): Promise<void> =>
        Promise.all([
          prepareSidebarData(app, themeConfig),
          prepareThemeColorScss(app, themeConfig),
        ]).then(() => void 0),

      plugins: getPluginConfig(app, plugins, themeConfig, hostname),

      layouts: getLayoutConfig(app, plugins),

      templateBuild: path.resolve(
        __dirname,
        "../../templates/index.build.html"
      ),

      clientAppEnhanceFiles: [
        path.resolve(__dirname, "../client/appEnhance.js"),
        path.resolve(__dirname, "../client/module/navbar/appEnhance.js"),
        path.resolve(__dirname, "../client/module/sidebar/appEnhance.js"),
        ...(enableBlog
          ? [path.resolve(__dirname, "../client/module/blog/appEnhance.js")]
          : []),
      ],

      clientAppSetupFiles: [
        ...(enableBlog
          ? [path.resolve(__dirname, "../client/module/blog/appSetup.js")]
          : []),
        path.resolve(__dirname, "../client/module/outlook/appSetup.js"),
        path.resolve(__dirname, "../client/module/sidebar/appSetup.js"),
      ],
    };
  };

export const hope = hopeTheme;

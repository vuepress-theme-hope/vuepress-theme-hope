import { path } from "@vuepress/utils";

import { checkStyle, covertFrontmatter, covertThemeConfig } from "./migrate";
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
  (
    options: HopeThemeOptions,
    // TODO: remove this option in stable release
    legacy = false
  ): ThemeFunction =>
  (app) => {
    const {
      plugins = {},
      hostname = "",
      ...themeOptions
    } = legacy ? covertThemeConfig(options) : options;

    const enableBlog = Boolean(plugins.blog);
    const themeConfig = getThemeConfig(app, themeOptions, enableBlog);

    if (legacy) checkStyle(app);

    usePlugin(app, plugins);

    if (enableBlog) {
      const icons = checkSocialMediaIcons(themeConfig);

      void app.writeTemp(
        `theme-hope/socialMedia.js`,
        `export const icons = ${JSON.stringify(icons)}`
      );
    }

    if (app.env.isDebug) console.log("Theme plugin options:", plugins);

    return {
      name: "vuepress-theme-hope",

      alias: resolveAlias(app.env.isDebug),

      define: () => ({
        ENABLE_BLOG: enableBlog,
        ENABLE_VISITOR: Boolean(
          plugins.comment && plugins.comment.type === "waline"
        ),
      }),

      extendsBundlerOptions: (config: unknown, app): void =>
        updateBundlerConfig(config, app),

      extendsPage: (page): void => {
        if (legacy)
          page.frontmatter = covertFrontmatter(
            page.frontmatter,
            page.filePathRelative || ""
          );

        extendsPage(
          themeConfig,
          plugins,
          page as Page<HopeThemePageData>,
          app.env.isDev
        );
      },

      onPrepared: (): Promise<void> =>
        Promise.all([
          prepareSidebarData(app, themeConfig),
          prepareThemeColorScss(app, themeConfig),
        ]).then(() => void 0),

      plugins: getPluginConfig(plugins, themeConfig, hostname),

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
        ...("encrypt" in themeOptions
          ? [path.resolve(__dirname, "../client/module/encrypt/appEnhance.js")]
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

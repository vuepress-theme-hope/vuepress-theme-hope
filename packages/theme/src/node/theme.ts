import { path } from "@vuepress/utils";

import { getAlias } from "./alias";
import { updateBundlerOptions } from "./bundler";
import { handleThemeData } from "./handleThemeData";
import { extendsPage } from "./extends";
import { getLayoutConfig } from "./layout";
import { getPluginConfig, usePlugin } from "./plugins";
import { writeThemeColorScss } from "./themeColor";

import type { Page, Theme } from "@vuepress/core";
import type {
  HopeThemeConfig,
  HopeThemeOptions,
  HopeThemePageData,
} from "../shared";

export const themeHope: Theme<HopeThemeOptions> = (
  { plugins = {}, ...themeOptions },
  app
) => {
  updateBundlerOptions(app);
  handleThemeData(app, themeOptions);
  usePlugin(app, plugins);

  return {
    name: "vuepress-theme-hope",

    alias: getAlias(app),

    define: () => ({
      ENABLE_BLOG: Boolean(plugins.blog),
    }),

    extendsPage: (page) =>
      extendsPage(
        themeOptions as HopeThemeConfig,
        plugins,
        page as Page<HopeThemePageData>,
        app.env.isDev
      ),

    async onPrepared(): Promise<void> {
      await writeThemeColorScss(app, themeOptions as HopeThemeConfig);
    },

    plugins: getPluginConfig(app, plugins, themeOptions as HopeThemeConfig),

    layouts: getLayoutConfig(app, plugins),

    templateBuild: path.resolve(__dirname, "../../templates/index.build.html"),

    clientAppEnhanceFiles: [
      path.resolve(__dirname, "../client/appEnhance.js"),
      ...(plugins.blog
        ? [path.resolve(__dirname, "../client/module/blog/appEnhance.js")]
        : []),
    ],

    clientAppSetupFiles: [
      ...(plugins.blog
        ? [path.resolve(__dirname, "../client/module/blog/appSetup.js")]
        : []),
      path.resolve(__dirname, "../client/module/outlook/appSetup.js"),
      path.resolve(__dirname, "../client/module/sidebar/appSetup.js"),
    ],
  };
};

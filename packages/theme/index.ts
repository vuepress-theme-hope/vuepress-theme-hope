import { Context, PluginOptionAPI } from "@mr-hope/vuepress-types";
import { ResolvedHopeThemeConfig } from "./types";
import { CAC } from "cac";
import eject from "./lib/eject";
import getPlugin from "./lib/plugins";
import { resolve } from "path";

interface ThemeOptionAPI extends PluginOptionAPI {
  extend?: string;
}

const getAlias = (
  themeConfig: ResolvedHopeThemeConfig,
  ctx: Context
): Record<string, string> => {
  const { siteConfig } = ctx;
  // Resolve algolia
  const isAlgoliaSearch =
    themeConfig.algolia ||
    Object.keys((siteConfig.locales && themeConfig.locales) || {}).some(
      (base) => themeConfig.locales[base].algolia
    );

  const blogEnabled = themeConfig.blog !== false;
  const commentPluginEnabled = themeConfig.comment !== false;
  const commentEnabled =
    themeConfig.comment &&
    themeConfig.comment.type &&
    themeConfig.comment.type !== "disable";

  const themeColorEnabled = !(
    themeConfig.themeColor === false && themeConfig.darkmode === "disable"
  );

  const noopModule = "vuepress-theme-hope/lib/noopModule.js";

  return {
    "@AlgoliaSearchBox": isAlgoliaSearch
      ? resolve(__dirname, "./components/AlgoliaSearchBox.vue")
      : noopModule,
    "@BlogInfo": blogEnabled
      ? resolve(__dirname, "./components/BlogInfo.vue")
      : noopModule,
    "@BlogPage": blogEnabled
      ? resolve(__dirname, "./components/BlogPage.vue")
      : noopModule,
    "@Comment":
      commentPluginEnabled && commentEnabled
        ? "@mr-hope/vuepress-plugin-comment/Comment.vue"
        : noopModule,
    "@PageInfo": commentPluginEnabled
      ? "@mr-hope/vuepress-plugin-comment/PageInfo.vue"
      : noopModule,
    "@ThemeColor": themeColorEnabled
      ? resolve(__dirname, "./components/ThemeColor.vue")
      : noopModule,
  };
};

// Theme API.
export = (
  themeConfig: ResolvedHopeThemeConfig,
  ctx: Context
): ThemeOptionAPI => {
  const config: ThemeOptionAPI = {};

  if (themeConfig.blog !== false)
    config.additionalPages = [
      {
        path: "/article/",
        frontmatter: { layout: "Blog" },
      },
      {
        path: "/timeline/",
        frontmatter: { layout: "Blog" },
      },
    ];

  config.alias = getAlias(themeConfig, ctx);

  config.plugins = getPlugin(themeConfig);

  config.extendCli = (cli: CAC): void => {
    cli
      .command(
        "eject-hope [targetDir]",
        "copy vuepress-theme-hope into .vuepress/theme for customization."
      )
      .option("--debug", "eject in debug mode")
      .action((dir = ".") => {
        void eject(dir);
      });
  };

  return config;
};

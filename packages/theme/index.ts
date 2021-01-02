import { resolve } from "path";
import { CAC } from "cac";
import { eject } from "./node/eject";
import { getPluginConfig } from "./node/plugins";
import { config } from "./node/config";

import { Context, PluginOptionAPI } from "@mr-hope/vuepress-types";
import { ResolvedHopeThemeConfig } from "./types";

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
    Boolean(themeConfig.algolia) ||
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

  const noopModule = "vuepress-theme-hope/util/noopModule";

  return {
    "@AlgoliaSearchBox": isAlgoliaSearch
      ? themeConfig.algoliaType === "full"
        ? resolve(__dirname, "./components/AlgoliaSearch/Full.vue")
        : resolve(__dirname, "./components/AlgoliaSearch/Dropdown.vue")
      : noopModule,
    "@BlogInfo": blogEnabled
      ? resolve(__dirname, "./components/Blog/BlogInfo.vue")
      : noopModule,
    "@BlogHome": blogEnabled
      ? resolve(__dirname, "./components/Blog/BlogHome.vue")
      : noopModule,
    "@BlogPage": blogEnabled
      ? resolve(__dirname, "./components/Blog/BlogPage.vue")
      : noopModule,
    "@Comment":
      commentPluginEnabled && commentEnabled
        ? "@mr-hope/vuepress-plugin-comment/lib/client/Comment.vue"
        : noopModule,
    "@PageInfo": commentPluginEnabled
      ? "@mr-hope/vuepress-plugin-comment/lib/client/PageInfo.vue"
      : noopModule,
    "@ThemeColor": themeColorEnabled
      ? resolve(__dirname, "./components/Theme/ThemeColor.vue")
      : noopModule,
  };
};

// Theme API.
const themeAPI = (
  themeConfig: ResolvedHopeThemeConfig,
  ctx: Context
): ThemeOptionAPI => ({
  alias: getAlias(themeConfig, ctx),

  plugins: getPluginConfig(themeConfig),

  additionalPages:
    themeConfig.blog === false
      ? []
      : [
          {
            path: "/article/",
            frontmatter: { layout: "Blog" },
          },
          {
            path: "/encrypt/",
            frontmatter: { layout: "Blog" },
          },
          {
            path: "/slide/",
            frontmatter: { layout: "Blog" },
          },
          {
            path: "/timeline/",
            frontmatter: { layout: "Blog" },
          },
        ],

  extendCli: (cli: CAC): void => {
    cli
      .command(
        "eject-hope [targetDir]",
        "copy vuepress-theme-hope into .vuepress/theme for customization."
      )
      .option("--debug", "eject in debug mode")
      .action((dir = ".") => {
        void eject(dir);
      });
  },
});

themeAPI.config = config;

export = themeAPI;

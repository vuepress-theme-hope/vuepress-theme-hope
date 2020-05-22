import { Context, PluginOptionAPI } from "vuepress-types";
import { ResolvedHopeThemeConfig } from "../types";
import getPlugin from "./lib/plugins";

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

  const commentEnabled = themeConfig.comment !== false;
  const noopModule = "vuepress-theme-hope/src/lib/noopModule.js";

  return {
    "@AlgoliaSearchBox": isAlgoliaSearch
      ? "vuepress-theme-hope/src/components/AlgoliaSearchBox.vue"
      : noopModule,
    "@Comment": commentEnabled
      ? "@mr-hope/vuepress-plugin-comment/Comment.vue"
      : noopModule,
    "@PageInfo": commentEnabled
      ? "@mr-hope/vuepress-plugin-comment/PageInfo.vue"
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

  return config;
};

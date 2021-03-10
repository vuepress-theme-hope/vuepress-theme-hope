import { resolve } from "path";

import type { Context } from "@mr-hope/vuepress-types";
import type { ResolvedHopeThemeConfig } from "../types";

export const getAlias = (
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
        ? resolve(__dirname, "../components/AlgoliaSearch/Full.vue")
        : resolve(__dirname, "../components/AlgoliaSearch/Dropdown.vue")
      : noopModule,
    "@BlogInfo": blogEnabled
      ? resolve(__dirname, "../components/Blog/BlogInfo.vue")
      : noopModule,
    "@BlogHome": blogEnabled
      ? resolve(__dirname, "../components/Blog/BlogHome.vue")
      : noopModule,
    "@BlogPage": blogEnabled
      ? resolve(__dirname, "../components/Blog/BlogPage.vue")
      : noopModule,
    "@Comment":
      commentPluginEnabled && commentEnabled
        ? "@mr-hope/vuepress-plugin-comment/lib/client/Comment.vue"
        : noopModule,
    "@PageInfo": commentPluginEnabled
      ? "@mr-hope/vuepress-plugin-comment/lib/client/PageInfo.vue"
      : noopModule,
    "@ThemeColor": themeColorEnabled
      ? resolve(__dirname, "../components/Theme/ThemeColor.vue")
      : noopModule,
  };
};

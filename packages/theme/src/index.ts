/*
 * @Author: Mr.Hope
 * @Date: 2019-09-19 11:01:50
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2020-03-23 11:41:16
 * @Description: 主题配置
 */
import { Context, PluginOptionAPI } from 'vuepress-types';
import { ResolvedHopeThemeConfig } from '../types';
import pluginConfig from './lib/plugins';

interface ThemeOptionAPI extends PluginOptionAPI {
  extend?: string;
}

// Theme API.
export = (
  themeConfig: ResolvedHopeThemeConfig,
  ctx: Context
): ThemeOptionAPI => {
  const config: ThemeOptionAPI = {
    /** 添加文章页面 */
    additionalPages: [
      {
        path: '/article/',
        frontmatter: { layout: 'BlogEntry' }
      }
    ] as any
  };

  const { siteConfig } = ctx;
  // Resolve algolia
  const isAlgoliaSearch =
    themeConfig.algolia ||
    Object.keys((siteConfig.locales && themeConfig.locales) || {}).some(
      (base) => themeConfig.locales[base].algolia
    );

  const commentEnabled = themeConfig.comment !== false;
  const themeColorEnabled = themeConfig.themeColor !== false;
  const noopModule = 'vuepress-theme-hope/src/lib/noopModule.js';

  config.alias = {
    '@AlgoliaSearchBox': isAlgoliaSearch
      ? 'vuepress-theme-hope/src/components/AlgoliaSearchBox.vue'
      : noopModule,
    '@Comment': commentEnabled
      ? '@mr-hope/vuepress-plugin-comment/Comment.vue'
      : noopModule,
    '@PageInfo': commentEnabled
      ? '@mr-hope/vuepress-plugin-comment/PageInfo.vue'
      : noopModule,
    '@ThemeColor': themeColorEnabled
      ? '@mr-hope/vuepress-plugin-theme-color/ThemeColor.vue'
      : noopModule
  };

  /** 插件选项 */
  config.plugins = pluginConfig(themeConfig);

  return config;
};

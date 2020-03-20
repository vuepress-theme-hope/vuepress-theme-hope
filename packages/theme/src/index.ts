/*
 * @Author: Mr.Hope
 * @Date: 2019-09-19 11:01:50
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2020-03-21 00:45:31
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
  const config: ThemeOptionAPI = {};

  const { siteConfig } = ctx;
  // Resolve algolia
  const isAlgoliaSearch =
    themeConfig.algolia ||
    Object.keys((siteConfig.locales && themeConfig.locales) || {}).some(
      base => themeConfig.locales[base].algolia
    );

  config.alias = {
    '@AlgoliaSearchBox': `@vuepress/theme-default/${
      isAlgoliaSearch ? 'components/AlgoliaSearchBox.vue' : 'noopModule.js'
    }`
  };

  /** 插件选项 */
  config.plugins = pluginConfig(themeConfig);

  return config;
};

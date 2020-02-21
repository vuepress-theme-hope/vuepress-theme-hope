/*
 * @Author: Mr.Hope
 * @Date: 2019-09-19 11:01:50
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2020-02-21 10:52:31
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
    /** 继承默认主题 */
    extend: '@vuepress/theme-default'
  };

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

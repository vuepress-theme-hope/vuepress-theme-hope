/* eslint-disable max-lines-per-function */
/*
 * @Author: Mr.Hope
 * @Date: 2019-09-19 11:01:50
 * @LastEditors  : Mr.Hope
 * @LastEditTime : 2020-01-06 09:44:24
 * @Description: 主题配置
 */
const { path } = require('@vuepress/shared-utils');
const pluginConfig = require('./plugins');

// Theme API.
module.exports = (themeConfig, ctx) => {
  const config = {};

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

  /** 继承默认主题 */
  config.extend = '@vuepress/theme-default';

  /** 插件选项 */
  config.plugins = pluginConfig(themeConfig);

  return config;
};

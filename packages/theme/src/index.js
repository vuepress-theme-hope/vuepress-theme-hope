/* eslint-disable max-lines-per-function */
/*
 * @Author: Mr.Hope
 * @Date: 2019-09-19 11:01:50
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-10-27 19:56:16
 * @Description: 主题配置
 */
const { resolve } = require('path');
const pluginConfig = require('./plugins');

// Theme API.
module.exports = (themeConfig, ctx) => ({
  alias() {
    const { siteConfig } = ctx;
    // Resolve algolia
    const isAlgoliaSearch =
      themeConfig.algolia ||
      Object.keys((siteConfig.locales && themeConfig.locales) || {}).some(
        base => themeConfig.locales[base].algolia
      );

    return {
      '@AlgoliaSearchBox': `@vuepress/theme-default/${
        isAlgoliaSearch ? 'components/AlgoliaSearchBox.vue' : 'noopModule.js'
      }`
    };
  },

  /** 继承默认主题 */
  extend: '@vuepress/theme-default',

  /** App 增强文件位置 */
  enhanceAppFiles: resolve(__dirname, 'lib/enhanceApp.js'),

  /** 插件选项 */
  plugins: pluginConfig(themeConfig)
});

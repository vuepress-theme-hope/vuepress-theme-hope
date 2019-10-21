/* eslint-disable max-lines-per-function */
/*
 * @Author: Mr.Hope
 * @Date: 2019-09-19 11:01:50
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-10-21 14:12:09
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

  /** Markdown 增强 */
  chainMarkdown(config) {
    const markdownOption = themeConfig.markdown || {};

    // 增加上角标
    if (markdownOption.sup !== false)
      config.plugin('sup').use(require('./plugins/markdown/markdown-it-sup'));
    // 增加下角标
    if (markdownOption.sub !== false)
      config.plugin('sub').use(require('./plugins/markdown/markdown-it-sub'));

    // 增加脚注
    if (markdownOption.footnote !== false)
      config
        .plugin('footnote')
        .use(require('./plugins/markdown/markdown-it-footnote'));

    // 添加行号
    if (markdownOption.lineNumbers !== false)
      config
        .plugin('line-numbers')
        .use(require('@vuepress/markdown/lib/lineNumbers'));
  },

  /** App 增强文件位置 */
  enhanceAppFiles: resolve(__dirname, 'lib/enhanceApp.js'),

  /** 插件选项 */
  plugins: pluginConfig(themeConfig)
});

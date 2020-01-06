/*
 * @Author: Mr.Hope
 * @Date: 2019-09-19 11:01:50
 * @LastEditors  : Mr.Hope
 * @LastEditTime : 2020-01-05 10:57:14
 * @Description: 主题配置
 */
import { Context, PluginOptionAPI } from 'vuepress-types';
import pluginConfig from './plugins';

interface ThemeOptionAPI extends PluginOptionAPI {
  extend?: string;
}

// Theme API.
module.exports = (themeConfig: any, ctx: Context): ThemeOptionAPI => {
  const config: ThemeOptionAPI = {
    /** 继承默认主题 */
    extend: '@vuepress/theme-default',

    /**
     * 允许下列文件支持 typescript:
     * - .ts
     * - .vue
     * - .md
     */
    chainWebpack: chainWebpackConfig => {
      chainWebpackConfig.resolve.extensions.add('.ts');

      chainWebpackConfig.module
        .rule('ts')
        .test(/\.ts$/u)
        .use('ts-loader')
        .loader('ts-loader')
        .options({
          appendTsSuffixTo: [/\.vue$/u, /\.md$/u],
          compilerOptions: {
            declaration: false
          }
        });
    }
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

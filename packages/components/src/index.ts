/*
 * @Author: Mr.Hope
 * @Date: 2020-01-07 09:12:52
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2020-02-21 11:46:25
 * @Description: 插件主入口
 */

import { Context, PluginOptionAPI } from 'vuepress-types';
import { resolve } from 'path';

export = (_option: any, context: Context): PluginOptionAPI => ({
  name: 'components',

  enhanceAppFiles: resolve(__dirname, 'enhanceAppFile.ts'),

  /** Typescript Support */
  chainWebpack: (chainWebpackConfig, isServer): void => {
    if (!context.themeConfig.tsEnable) {
      const { cacheDirectory, cacheIdentifier } = context as any;
      const finalCacheIdentifier = `${cacheIdentifier}isServer:${isServer}`;

      chainWebpackConfig.resolve.extensions.add('.ts');

      chainWebpackConfig.module
        .rule('ts')
        .test(/\.ts$/u)
        .use('cache-loader')
        .loader('cache-loader')
        .options({
          cacheDirectory,
          cacheIdentifier: finalCacheIdentifier
        })
        .end()
        .use('ts-loader')
        .loader('ts-loader')
        .options({
          appendTsSuffixTo: [/\.vue$/u],
          compilerOptions: { declaration: false }
        })
        .end();
    }
  },

  globalUIComponents: 'BackToTop'
});

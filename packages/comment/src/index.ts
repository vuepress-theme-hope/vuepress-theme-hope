/*
 * @Author: Mr.Hope
 * @Date: 2020-01-13 18:40:39
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2020-02-21 11:43:56
 * @Description: 插件主入口，如果没有使用 Vssue 则不加载相关插件
 */
import { Context, PluginOptionAPI } from 'vuepress-types';
import { CommentOptions } from '../types';
import { resolve } from 'path';

export = (option: CommentOptions, context: Context): PluginOptionAPI => {
  const config: PluginOptionAPI = {
    name: 'comment',

    define: () =>
      ({
        COMMENT_OPTIONS: option || {}
      } as Record<string, any>),

    enhanceAppFiles: resolve(__dirname, 'enhanceAppFile.ts'),

    /** Typescript Support */
    chainWebpack: (chainWebpackConfig, isServer) => {
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
    }
  };

  if (option && option.type === 'vssue')
    config.plugins = [['@vssue/vuepress-plugin-vssue', option]];

  return config;
};

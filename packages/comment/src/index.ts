/*
 * @Author: Mr.Hope
 * @Date: 2020-01-13 18:40:39
 * @LastEditors  : Mr.Hope
 * @LastEditTime : 2020-01-30 17:16:53
 * @Description: 插件主入口，如果没有使用 Vssue 则不加载相关插件
 */
import { CommentOptions } from '../types';
import { PluginOptionAPI } from 'vuepress-types';
import { resolve } from 'path';

export = (options: CommentOptions): PluginOptionAPI => {
  const config: PluginOptionAPI = {
    name: 'comment',

    define: () =>
      ({
        COMMENT_OPTIONS: options || {}
      } as Record<string, any>),

    enhanceAppFiles: resolve(__dirname, 'enhanceAppFile.ts'),

    /** Typescript Support */
    chainWebpack: chainWebpackConfig => {
      chainWebpackConfig.resolve.extensions.add('.ts');

      chainWebpackConfig.module
        .rule('ts')
        .test(/\.ts$/u)
        .use('ts-loader')
        .loader('ts-loader')
        .options({
          appendTsSuffixTo: [/\.vue$/u],
          compilerOptions: { declaration: false }
        });
    }
  };

  if (options && options.type === 'vssue')
    config.plugins = [['@vssue/vuepress-plugin-vssue', options]];

  return config;
};

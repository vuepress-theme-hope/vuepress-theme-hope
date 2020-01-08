/*
 * @Author: Mr.Hope
 * @Date: 2020-01-07 09:12:52
 * @LastEditors  : Mr.Hope
 * @LastEditTime : 2020-01-08 09:57:01
 * @Description: 插件主入口
 */

import { PluginOptionAPI } from 'vuepress-types';
import { resolve } from 'path';

const pluginOption: PluginOptionAPI = {
  name: 'components',

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
  },

  globalUIComponents: 'BackToTop'
};

export = pluginOption;

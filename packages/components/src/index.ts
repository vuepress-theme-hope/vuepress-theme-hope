/*
 * @Author: Mr.Hope
 * @Date: 2020-01-07 09:12:52
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2020-03-10 22:11:01
 * @Description: 插件主入口
 */

import { PluginOptionAPI } from 'vuepress-types';
import { resolve } from 'path';

export = {
  name: 'components',

  enhanceAppFiles: resolve(__dirname, 'enhanceAppFile.ts'),

  plugins: [
    /** typescript 支持 */
    ['typescript']
  ],

  globalUIComponents: 'BackToTop'
} as PluginOptionAPI;

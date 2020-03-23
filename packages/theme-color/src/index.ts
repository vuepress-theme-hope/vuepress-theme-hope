/*
 * @Author: Mr.Hope
 * @Date: 2020-01-13 18:40:39
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2020-03-23 18:47:36
 * @Description:
 */
import { PluginOptionAPI } from 'vuepress-types';
import { ThemeColorOptions } from '../types';

export = (options: ThemeColorOptions): PluginOptionAPI =>
  ({
    name: 'theme-color',

    define: () =>
      ({
        THEME_COLOR_OPTIONS: options
      } as Record<string, any>),

    plugins: [
      /** typescript 支持 */
      ['typescript']
    ]
  } as PluginOptionAPI);

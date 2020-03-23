/*
 * @Author: Mr.Hope
 * @Date: 2020-01-13 18:40:39
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2020-03-23 20:06:36
 * @Description: 插件主入口，如果没有使用 Vssue 则不加载相关插件
 */
import { CommentOptions } from '../types';
import { PluginOptionAPI } from 'vuepress-types';

export = (option: CommentOptions): PluginOptionAPI => {
  const config: PluginOptionAPI = {
    name: 'comment',

    define: () =>
      ({
        COMMENT_OPTIONS: option
      } as Record<string, any>),

    plugins: [
      /** typescript 支持 */
      ['typescript']
    ]
  };

  if (option.type === 'vssue')
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    config.plugins!.push(['@vssue/vuepress-plugin-vssue', option]);

  return config;
};

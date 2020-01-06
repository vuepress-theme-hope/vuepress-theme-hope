/*
 * @Author: Mr.Hope
 * @Date: 2019-10-22 23:43:27
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-11-23 21:25:38
 * @Description: 插件配置
 */
import { i18n } from '@mr-hope/vuepress-shared-utils';

// eslint-disable-next-line max-lines-per-function
module.exports = (option, ctx) => {
  /** amrkdown 配置 */
  const markdownOption = option || ctx.themeConfig.markdown || {};
  /** 多语言标题配置 */
  const titleConfig = i18n.config.container;
  /** 主目录语言 */
  const baseLang =
    markdownOption.baseLang || ctx.themeConfig.baseLang || 'zh-CN';
  /** 主目录语言对应路径 */
  const baseLangPath = i18n.lang2path[baseLang];

  /** 处理标题 */
  const resolveTitle = config => {
    config['/'] = config[baseLangPath];

    return config;
  };

  return [
    /** 自定义容器配置 */
    [
      'container',
      {
        type: 'tip',
        defaultTitle: resolveTitle(titleConfig.tip)
      }
    ],
    [
      'container',
      {
        type: 'warning',
        defaultTitle: resolveTitle(titleConfig.warning)
      }
    ],
    [
      'container',
      {
        type: 'danger',
        defaultTitle: resolveTitle(titleConfig.danger)
      }
    ],

    /** 自定义居右容器 */
    ['container', { type: 'right', defaultTitle: '', marker: '~' }],
    /** 自定义居中容器 */
    ['container', { type: 'center', defaultTitle: '', marker: '~' }],

    /** Markdown 文件支持 TeX 语法 */
    ['mathjax', markdownOption.mathjax || markdownOption.enableAll]
  ];
};

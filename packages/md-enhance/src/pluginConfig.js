/*
 * @Author: Mr.Hope
 * @Date: 2019-10-22 23:43:27
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-10-25 14:17:40
 * @Description: 插件配置
 */

module.exports = (option, ctx) => {
  const markdownOption = option || ctx.themeConfig.markdown || {};
  const { baseLang } = ctx.themeConfig;

  const tipTitle = { '/zh/': '提示', '/en/': 'Tips' };
  const warningTitle = { '/zh/': '注意', '/en/': 'Note' };
  const dangerTitle = { '/zh/': '警告', '/en/': 'Warning' };

  /** 处理标题 */
  const resolveTitle = (config, mainLang = 'zh') => {
    config['/'] = config[`/${mainLang}/`];

    return config;
  };

  return [
    /** 自定义容器配置 */
    [
      'container',
      {
        type: 'tip',
        defaultTitle: resolveTitle(tipTitle, baseLang)
      }
    ],
    [
      'container',
      {
        type: 'warning',
        defaultTitle: resolveTitle(warningTitle, baseLang)
      }
    ],
    [
      'container',
      {
        type: 'danger',
        defaultTitle: resolveTitle(dangerTitle, baseLang)
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

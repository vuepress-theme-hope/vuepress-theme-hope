/*
 * @Author: Mr.Hope
 * @Date: 2019-07-05 00:14:26
 * @LastEditors  : Mr.Hope
 * @LastEditTime : 2020-01-18 14:02:08
 * @Description: Vuepress配置
 */

const resolve = require('vuepress-theme-hope/resolve');

module.exports = resolve({
  /** 网站标题 */
  title: '评论插件',

  /** 网站在该语言下的描述 */
  description: 'Vuepress 的 评论插件',

  headOption: {
    icon: '/favicon.ico',
    pwa: {
      manifest: '/manifest.json',
      themeColor: '#46bd87',
      appleStatusBarColor: 'black',
      appleIcon: '/img/icon/appleIcon152.png',
      msTileImage: '/img/icon/msIcon144.png',
      msTileColor: '#ffffff'
    }
  },

  /** 生成网站头部的标签 */
  head: [
    [
      'link',
      {
        rel: 'mask-icon',
        href: '/icons/safari-pinned-tab.svg',
        color: '#46bd87'
      }
    ]
  ],

  temp: './node_modules/.temp/comment',

  /** 构建文件输出目录 */
  dest: './dist',

  /** 多语言配置选项
   *
   * 键名是该语言所属的子路径
   * 作为特例，默认语言可以使用 '/' 作为其路径。
   */
  locales: {
    /** 英文设置 */
    '/en/': {
      /** 网站在该语言下的标题 */
      title: 'Comment Plugin',

      /** 网站在该语言下的描述 */
      description: 'Comment Plugin for Vuepress'
    }
  },
  /** 主题配置 */
  themeConfig: require('./themeConfig')
});

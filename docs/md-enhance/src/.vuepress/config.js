/*
 * @Author: Mr.Hope
 * @Date: 2019-07-05 00:14:26
 * @LastEditors  : Mr.Hope
 * @LastEditTime : 2020-01-09 11:10:23
 * @Description: Vuepress配置
 */
const resolve = require('vuepress-theme-hope/resolve');

module.exports = resolve({
  /** 网站标题 */
  title: 'Markdown 增强',

  /** 网站在该语言下的描述 */
  description: 'Vuepress 的 Markdown 增强插件',

  headOption: {
    icon: '/favicon.ico'
  },

  /** 生成网站头部的标签 */
  head: [
    // pwa相关
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#46bd87' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }
    ],
    ['link', { rel: 'apple-touch-icon', href: '/img/icon/appleIcon152.png' }],
    [
      'link',
      {
        rel: 'mask-icon',
        href: '/icons/safari-pinned-tab.svg',
        color: '#46bd87'
      }
    ],
    [
      'meta',
      { name: 'msapplication-TileImage', content: '/img/icon/msIcon144.png' }
    ],
    ['meta', { name: 'msapplication-TileColor', content: '#ffffff' }]
  ],

  temp: './node_modules/.temp/md-enhance',

  /** 构建文件输出目录 */
  dest: './dist',

  locales: {
    /** 英文设置 */
    '/en/': {
      /** 网站在该语言下的标题 */
      title: 'Markdown Enhance Plugin',

      /** 网站在该语言下的描述 */
      description: 'Markdown Enhancement for Vuepress'
    }
  },

  /** 主题配置 */
  themeConfig: require('./themeConfig')
});

/*
 * @Author: Mr.Hope
 * @Date: 2019-07-05 00:14:26
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-10-17 21:23:36
 * @Description: Vuepress配置
 */

module.exports = {
  /** 部署目录 */
  base: process.env.VuePress_BASE || '/',

  /** 网站标题 */
  title: 'Theme Demo',

  /** 网站描述 */
  description: 'vuepress-theme-hope 的 demo',

  /** 生成网站头部的标签 */
  head: [
    // 设置网站图标
    ['link', { rel: 'icon', href: '/favicon.ico' }],

    // 设置网站作者
    ['meta', { name: 'author', content: 'Mr.Hope' }],

    // 移动端App体验
    ['meta', {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
    }],

    // pwa相关
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#46bd87' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: '/img/icon/appleIcon152.png' }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#46bd87' }],
    ['meta', { name: 'msapplication-TileImage', content: '/img/icon/msIcon144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#ffffff' }]
  ],

  /** 构建文件输出目录 */
  dest: './tests/demo-dist',

  /** 多语言配置选项
   * 
   * 键名是该语言所属的子路径
   * 作为特例，默认语言可以使用 '/' 作为其路径。
   */
  locales: {
    /** 默认语言 */
    '/': {
      /** 设置为中文 */
      lang: 'zh-CN'
    },
    /** 英文设置 */
    '/en/': {
      /** 设置为英文 */
      lang: 'en-US', // 将会被设置为 <html> 的 lang 属性

      /** 网站在该语言下的标题 */
      title: 'Theme Demo',

      /** 网站在该语言下的描述 */
      description: 'A demo for vuepress-theme-hope'
    }
  },

  extraWatchFiles: [
    '.vuepress/config/navBar.js',
    '.vuepress/config/sideBar.js',
    '.vuepress/config/theme.js'
  ],

  /** 主题配置 */
  themeConfig: require('./config/theme'),

  /** 是否只支持常青树浏览器 */
  evergreen: true // 设置为true后将不会兼容IE等老旧浏览器
};

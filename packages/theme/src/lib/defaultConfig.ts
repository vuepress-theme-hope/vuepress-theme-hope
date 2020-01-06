/*
 * @Author: Mr.Hope
 * @Date: 2020-01-01 18:56:32
 * @LastEditors  : Mr.Hope
 * @LastEditTime : 2020-01-01 22:43:02
 * @Description: vuepress-theme-hope 的默认配置
 */

export default {
  /** 部署目录 */
  // eslint-disable-next-line no-process-env
  base: process.env.VuePress_BASE || '/',

  /** 生成网站头部的标签 */
  head: [
    // 设置网站图标
    ['link', { rel: 'icon', href: '/favicon.ico' }],

    // 设置网站作者
    ['meta', { name: 'author', content: 'Mr.Hope' }],

    // 移动端App体验
    [
      'meta',
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
      }
    ],

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

  /** 使用的主题 */
  theme: 'hope',

  /** 主题配置 */
  themeConfig: {
    /** 根目录语言 */
    baseLang: 'zh-CN',

    /** 侧边栏标题显示深度，0-2 */
    sidebarDepth: 2,

    /** 图标 FontClass 前缀 */
    iconPrefix: 'icon-',

    /** 页脚 */
    footer: {
      /** 页脚默认文字 */
      text: 'MIT Licensed | Copyright © 2019-present Mr.Hope'
    },

    /** 多语言配置 */
    locales: {},

    /** 开启编辑此页链接 */
    editLinks: true // 默认是 false, 设置为 true 来启用
  },

  /** 是否只支持常青树浏览器 */
  evergreen: true // 设置为 true 后将不会兼容 IE 等老旧浏览器
};

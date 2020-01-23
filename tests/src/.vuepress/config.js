/*
 * @Author: Mr.Hope
 * @Date: 2019-07-05 00:14:26
 * @LastEditors  : Mr.Hope
 * @LastEditTime : 2020-01-24 00:07:26
 * @Description: Vuepress配置
 */

const resolve = require('vuepress-theme-hope/resolve');
const navBarConfig = require('./config/navBar');
const sideBarConfig = require('./config/sideBar');

module.exports = resolve({
  title: 'Theme Demo',
  description: 'vuepress-theme-hope 的 demo',

  headOption: {
    icon: '/favicon.ico'
  },
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

  temp: './node_modules/.temp/test',
  dest: './dist',

  locales: {
    '/en/': {
      title: 'Theme Demo',
      description: 'A demo for vuepress-theme-hope'
    }
  },

  extraWatchFiles: [
    '.vuepress/config/navBar.js',
    '.vuepress/config/sideBar.js',
    '.vuepress/config/theme.js'
  ],

  themeConfig: {
    logo: '/logo.svg',

    nav: navBarConfig.zh,
    sidebar: sideBarConfig.zh,

    author: 'Mr.Hope',
    footer: {
      text: '默认页脚'
    },

    markdown: {
      enableAll: true
    },
    comment: {
      type: 'valine',
      appId: 'msnseO76haIVIGvfJ10BKnpv-gzGzoHsz',
      appKey: '9QMulKhu7EDp1va0TYXR2PrI'
    },
    encrypt: {
      global: '01311031',
      config: {
        '/en/': ['1234', '5678'],
        '/test/detail/': '1234',
        '/test/footer/default': '5678'
      }
    },

    locales: {
      '/en/': {
        nav: navBarConfig.en,
        sidebar: sideBarConfig.en
      }
    },

    repo: 'https://github.com/mister-hope/vuepress-theme-hope',
    repoLabel: 'Github'
    /** 分享设置 */
    // share: {
    //   content: ['qq', 'twitter', 'weibo'],
    //   fallbackImage: '/logo.png'
    // }
  }
});

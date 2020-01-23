/*
 * @Author: Mr.Hope
 * @Date: 2019-07-05 00:14:26
 * @LastEditors  : Mr.Hope
 * @LastEditTime : 2020-01-24 00:08:26
 * @Description: Vuepress配置
 */
const resolve = require('vuepress-theme-hope/resolve');
const navBarConfig = require('./config/navBar');
const sideBarConfig = require('./config/sideBar');

module.exports = resolve({
  title: 'vuepress-theme-hope',
  description: '一个轻量的 vuepress 主题',

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

  temp: './node_modules/.temp/theme',
  dest: './dist',
  extraWatchFiles: [
    '.vuepress/config/navBar.js',
    '.vuepress/config/sideBar.js',
    '.vuepress/config/theme.js'
  ],

  locales: {
    '/en/': {
      title: 'vuepress-theme-hope',
      description: 'A light vuepress theme'
    }
  },

  themeConfig: {
    logo: '/logo.svg',
    nav: navBarConfig.zh,
    sidebar: sideBarConfig.zh,
    author: 'Mr.Hope',
    iconPrefix: 'vuepress-',

    markdown: {
      enableAll: true
    },

    comment: {
      type: 'valine',
      appId: 'ENQC8OAX6E76OUB07ODFfUHm-gzGzoHsz',
      appKey: '2JK4ezJDqxPTF7JLn5Wk6i8y'
    },

    locales: {
      '/en/': {
        nav: navBarConfig.en,
        sidebar: sideBarConfig.en
      }
    },

    algolia: {
      apiKey: '4deb442097fb6a05638adf10ef86e222',
      indexName: 'mrhope_vuepress-theme'
    },

    repo: 'https://github.com/mister-hope/vuepress-theme-hope',
    docsDir: 'docs/theme'
  }
});

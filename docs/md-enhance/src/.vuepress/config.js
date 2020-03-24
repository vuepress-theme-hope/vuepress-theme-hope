/*
 * @Author: Mr.Hope
 * @Date: 2019-07-05 00:14:26
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2020-03-24 11:40:48
 * @Description: Vuepress配置
 */
const resolve = require('vuepress-theme-hope/resolve');

module.exports = resolve({
  title: 'Markdown 增强',
  description: 'Vuepress 的 Markdown 增强插件',

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

  temp: './node_modules/.temp/md-enhance',
  dest: './dist',

  locales: {
    '/en/': {
      title: 'Markdown Enhance Plugin',
      description: 'Markdown Enhancement for Vuepress'
    }
  },

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: '主页', icon: 'homefill', link: '/' },
      { text: '指南', icon: 'creativefill', link: '/guide/' },
      { text: '配置', icon: 'api', link: '/api.html' }
    ],
    sidebar: {
      '/guide/': ['', 'sup-sub', 'align', 'footnote', 'flowchart', 'tex'],

      '/': ['', 'guide/', 'api']
    },

    author: 'Mr.Hope',
    iconPrefix: 'vuepress-',

    footer: {
      text: 'MIT Licensed | Copyright © 2019-present Mr.Hope'
    },
    markdown: {
      enableAll: true
    },
    comment: {
      type: 'valine',
      appId: 'YwtJvkJgikEDUjCFtygBQDwu-gzGzoHsz',
      appKey: 'BHsA7vE2TVwHAVELEpherqh4'
    },

    locales: {
      '/en/': {
        nav: [
          { text: 'Home', icon: 'homefill', link: '/en/' },
          { text: 'Guide', icon: 'creativefill', link: '/en/guide/' },
          { text: 'Config', icon: 'api', link: '/en/api.html' }
        ],
        sidebar: {
          '/en/guide/': [
            '',
            'sup-sub',
            'align',
            'footnote',
            'flowchart',
            'tex'
          ],

          '/en/': ['', 'guide/', 'api']
        }
      }
    },

    repo: 'https://github.com/mister-hope/vuepress-theme-hope/',
    docsDir: 'docs/md-enhance'
  }
});

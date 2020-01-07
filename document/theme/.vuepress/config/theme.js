/*
 * @Author: Mr.Hope
 * @Date: 2019-09-20 19:39:33
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-11-27 20:53:32
 * @Description: 主题配置文件
 */
const navBarConfig = require('./navBar');
const sideBarConfig = require('./sideBar');

module.exports = {
  /** 网站的logo */
  logo: '/logo.svg',

  /** 头部导航栏的配置 */
  nav: navBarConfig.zh,

  /** 侧边栏配置 */
  sidebar: sideBarConfig.zh,

  /** 默认作者 */
  author: 'Mr.Hope',

  /** 图标前缀 */
  iconPrefix: 'vuepress-',

  /** Markdown设置 */
  markdown: {
    enableAll: true
  },

  /** 评论设置 */
  comment: {
    type: 'valine',
    appId: 'ENQC8OAX6E76OUB07ODFfUHm-gzGzoHsz',
    appKey: '2JK4ezJDqxPTF7JLn5Wk6i8y'
  },

  /** 语言设置 */
  locales: {
    /** 英文设置 */
    '/en/': {
      /** 该语言下头部导航栏的配置 */
      nav: navBarConfig.en,

      /** 网站在该语言下的侧边栏 */
      sidebar: sideBarConfig.en
    }
  },

  /** 搜索设置 */
  algolia: {
    apiKey: '4deb442097fb6a05638adf10ef86e222',
    indexName: 'mrhope_vuepress-theme'
  },

  /** repo地址 */
  repo: 'https://github.com/mister-hope/vuepress-theme-hope',

  /** 文档目录 */
  docsDir: 'docs/theme'
};

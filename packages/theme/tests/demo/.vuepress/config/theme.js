/*
 * @Author: Mr.Hope
 * @Date: 2019-09-20 19:39:33
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-11-07 20:03:47
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

  /** 禁用路径导航 */
  breadcrumb: false,

  /** 默认作者 */
  author: 'Mr.Hope',

  /** Markdown设置 */
  markdown: {
    enableAll: true
  },

  /** 评论设置 */
  comment: {
    type: 'valine',
    appId: 'msnseO76haIVIGvfJ10BKnpv-gzGzoHsz',
    appKey: '9QMulKhu7EDp1va0TYXR2PrI'
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

  /** repo地址 */
  repo: 'https://github.com/mister-hope/vuepress-theme-hope',

  /** 编辑链接 */
  editLinks: false,

  /** 自定义仓库链接文字 */
  repoLabel: 'Github',

  /** 分享设置 */
  share: {
    content: ['qq', 'twitter', 'weibo'],
    fallbackImage: '/logo.png'
  }
};

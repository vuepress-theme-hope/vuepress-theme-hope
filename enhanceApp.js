/* eslint-disable no-unused-vars */
/*
 * @Author: Mr.Hope
 * @Date: 2019-07-05 00:15:31
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-10-12 00:37:52
 * @Description: Vuepress增强配置
 */
const resolveSideBar = require('./lib/resolve-sideBar');
const assign = require('./lib/assign');

export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  /** 主题配置 */
  const themeConfig = siteData.themeConfig;
  /** 主题默认配置 */
  const themeConfigDefault = {

    /** 侧边栏标题显示深度，0-2 */
    sidebarDepth: 2,

    /** 图标 FontClass 前缀 */
    iconPrefix: 'icon-',

    /** 页脚 */
    footer: {
      /** 页脚默认文字 */
      text: 'MIT Licensed | Copyright © 2019-present Mr.Hope'
    },

    /** 语言设置 */
    locales: {
      /** 默认语言 */
      '/': {
        lang: 'zh-CN',
        selectText: '选择语言',
        lastUpdated: '上次编辑于',
        label: '简体中文'
      },

      /** 英文设置 */
      '/en/': {
        /** 设置该语言的代码 */
        lang: 'en-US', // 将会被设置为 <html> 的 lang 属性

        /** 多语言下拉菜单的标题 */
        selectText: 'Language',

        /** 辅助标签 */
        ariaLabel: 'Select language',

        /** 该语言下的更新时间文字 */
        lastUpdated: 'Last update',

        /** 该语言在下拉菜单中的标签 */
        label: 'English',

        /** 编辑链接文字 */
        editLinkText: 'Edit on Github'
      }
    },

    /** 开启编辑此页链接 */
    editLinks: true, // 默认是 false, 设置为 true 来启用

    /** 编辑此页链接提示文字 */
    editLinkText: '在 GitHub 上编辑此页' // 默认为 "Edit this page"
  };

  // 处理侧边栏
  if (themeConfig.sidebar)
    if (Array.isArray(themeConfig.sidebar))
      themeConfig.sidebar = resolveSideBar(themeConfig.sidebar);
    else
      Object.keys(themeConfig.sidebar).forEach(property => {
        themeConfig.sidebar[property] = resolveSideBar(themeConfig.sidebar[property]);
      });

  assign(themeConfigDefault, themeConfig);
};

/*
 * @Author: Mr.Hope
 * @Date: 2019-11-23 18:48:57
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-11-23 21:28:24
 * @Description: 多语言配置
 */
module.exports = {
  /** 支持语言 */
  lang: ['zh-CN', 'en-US'],

  /** 语言对应路径 */
  lang2path: { 'zh-CN': '/zh/', 'en-US': '/en/' },

  /** 路径对应语言 */
  path2lang: {
    '/zh/': 'zh-CN',
    '/en/': 'en-US'
  },

  /** 多语言配置 */
  config: {
    /** 语言设置 */
    locales: {
      /** 中文设置 */
      'zh-CN': {
        lang: 'zh-CN',
        selectText: '选择语言',
        lastUpdated: '上次编辑于',
        label: '简体中文',
        editLinkText: '在 GitHub 上编辑此页'
      },

      /** 英文设置 */
      'en-US': {
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
        editLinkText: 'Edit on Github' // 默认为 "Edit this page"
      }
    },

    /** Valine 占位符 */
    valineHolder: {
      'zh-CN': '请留言',
      'en-US': 'Write a comment here'
    },

    /** 自定义容器插件 */
    container: {
      'zh-CN': {
        tip: '提示',
        warning: '注意',
        danger: '警告'
      },
      'en-US': {
        tip: 'Tips',
        warning: 'Note',
        danger: 'Warning'
      }
    },

    /** 主题色配置 */
    themeColor: {
      'zh-CN': {
        themeColor: '主题色',
        nightmode: ['日间模式', '夜间模式']
      },
      'en-US': {
        themeColor: 'Theme Color',
        nightmode: ['Daymode', 'Nightmode']
      }
    }
  }
};

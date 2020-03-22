/*
 * @Author: Mr.Hope
 * @Date: 2020-01-05 12:55:30
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2020-03-23 00:11:53
 * @Description: 多语言配置
 */
import { HopeLangI18nConfig } from '../../types';

export type Langs = 'zh-CN' | 'en-US';

export type LangPaths = '/zh/' | '/en/';

/** 支持语言 */
export const langs: Langs[] = ['zh-CN', 'en-US'];

/** 语言对应路径 */
export const lang2PathConfig: Record<string, LangPaths> = {
  'zh-CN': '/zh/',
  'en-US': '/en/'
};

/** 路径对应语言 */
export const path2langConfig: Record<string, Langs> = {
  '/zh/': 'zh-CN',
  '/en/': 'en-US'
};

/** 语言设置 */
export const localesConfig: Record<string, HopeLangI18nConfig> = {
  'zh-CN': {
    lang: 'zh-CN',
    selectText: '选择语言',
    lastUpdated: '上次编辑于',
    label: '简体中文',
    editLinkText: '在 GitHub 上编辑此页',
    valineHolder: '请留言',
    themeColor: {
      themeColor: '主题色',
      darkmode: ['日间模式', '夜间模式']
    },
    error404: {
      text: [
        '这里什么也没有',
        '我们是怎么来到这儿的？',
        '这 是 四 零 四 !',
        '看起来你访问了一个失效的链接'
      ],
      link: '带我回家'
    },
    pwa: '发现新内容可用',
    pagination: {
      prev: '上一页',
      next: '下一页',
      navigate: '跳转到',
      button: '前往',
      errorText: '请输入大于0，并且小于$page的页码！'
    },
    allText: '全部'
  },

  /** 英文设置 */
  'en-US': {
    lang: 'en-US',
    selectText: 'Language',
    /** 辅助标签 */
    ariaLabel: 'Select language',
    lastUpdated: 'Last update',
    label: 'English',
    editLinkText: 'Edit on Github',
    valineHolder: 'Write a comment here',
    themeColor: {
      themeColor: 'Theme Color',
      darkmode: ['Daymode', 'Nightmode']
    },
    error404: {
      text: [
        // eslint-disable-next-line quotes
        "There's nothing here.",
        // eslint-disable-next-line quotes
        'How did we get here?',
        // eslint-disable-next-line quotes
        "That's a Four-Oh-Four.",
        // eslint-disable-next-line quotes
        "Looks like we've got some broken links."
      ],
      link: 'Take me home'
    },
    pwa: 'New content is available.',
    pagination: {
      prev: 'Prev',
      next: 'Next',
      navigate: 'Jump to',
      button: 'Go',
      errorText: 'Please enter a number with is >0 and < $page !'
    },
    allText: 'All'
  }
};

/** 自定义容器插件 */
const containerConfig: Record<string, Record<string, string>> = {
  tip: {
    '/zh/': '提示',
    '/en/': 'Tips'
  },
  warning: {
    '/zh/': '注意',
    '/en/': 'Note'
  },
  danger: {
    '/zh/': '警告',
    '/en/': 'Warning'
  }
};

/** 插件配置 */
export const config = {
  container: containerConfig
};

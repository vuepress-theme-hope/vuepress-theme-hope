/*
 * @Author: Mr.Hope
 * @Date: 2019-09-19 11:01:50
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-10-12 23:39:01
 * @Description: 主题配置
 */
const path = require('path');

// Theme API.
module.exports = (options, ctx) => ({
  alias() {
    const { themeConfig, siteConfig } = ctx;
    // Resolve algolia
    const isAlgoliaSearch = (
      themeConfig.algolia ||
      Object.keys((siteConfig.locales && themeConfig.locales) || {})
        .some(base => themeConfig.locales[base].algolia)
    );

    return {
      '@AlgoliaSearchBox': isAlgoliaSearch
        ? path.resolve(__dirname, 'components/AlgoliaSearchBox.vue')
        : path.resolve(__dirname, 'noopModule.js')
    };
  },

  /** 继承默认主题 */
  extend: '@vuepress/theme-default',

  /** Markdown 增强 */
  chainMarkdown(config) {
    const markdownOption = options.markdown || {};

    // 增加上角标
    if (markdownOption.sup !== false)
      config.plugin('sup').use(require('markdown-it-sup'));
    // 增加下角标
    if (markdownOption.sub !== false)
      config.plugin('sub').use(require('markdown-it-sub'));

    // 增加脚注
    if (markdownOption.footnote !== false)
      config.plugin('footnote').use(require('markdown-it-footnote'));

    // 添加行号
    if (markdownOption.lineNumbers !== false)
      config.plugin('line-numbers').use(require('@vuepress/markdown/lib/lineNumbers'));
  },

  /** 插件选项 */
  plugins: [
    /** 页面滚动时自动激活侧边栏链接的插件，已由theme-default激活 */
    // '@vuepress/active-header-links',

    /** 进度条插件，已由theme-default激活 */
    // '@vuepress/nprogress'

    // FIXME:目前启用导航栏会报错，原因正在寻找中
    /** 使 VuePress 站点支持简洁链接 */
    // ['clean-urls', { normalSuffix: '/' }],

    /** 自定义容器配置 */
    [
      'container', {
        type: 'tip',
        defaultTitle: {
          '/': '提示',
          '/en/': 'Tips'
        }
      }
    ],
    [
      'container', {
        type: 'warning',
        defaultTitle: {
          '/': '注意',
          '/en/': 'Note'
        }
      }
    ],
    [
      'container', {
        type: 'danger',
        defaultTitle: {
          '/': '警告',
          '/en/': 'Warning'
        }
      }
    ],

    /** 自定义居右容器 */
    ['container', { type: 'right', defaultTitle: '', marker: '~' }],
    /** 自定义居中容器 */
    ['container', { type: 'center', defaultTitle: '', marker: '~' }],

    /** 复制操作处理 */
    [
      'copyright', {
        authorName: options.author,
        minLength: 100,
        clipboardComponent: path.resolve(__dirname, 'components/Clipboard.vue')
      }
    ],

    /** 支持流程图 */
    ['flowchart'],

    /** 平滑滚动 */
    ['smooth-scroll', options.smoothScroll !== false],

    /** 更新时间插件 */
    [
      '@vuepress/last-updated', {
        /** 转换时间戳 */
        transformer: (timestamp, lang) => {
          const moment = require('moment');

          moment.locale(lang);

          return moment(timestamp).format('LLL');
        }
      }
    ],

    /** PWA 插件 */
    [
      '@vuepress/pwa', {
        /** 是否注册Service Worker */
        serviceWorker: true,
        /** 是否弹出页面更新提示 */
        updatePopup: {
          '/': {
            message: '发现新内容可用',
            buttonText: '刷新'
          },
          '/en/': {
            message: 'New content is available.',
            buttonText: 'Refresh'
          }
        }
      }
    ],

    /** 搜索插件 */
    [
      '@vuepress/search', {
        /** 搜索展示数量 */
        searchMaxSuggestions: 10
      }
    ],

    /** 图片缩放插件 */
    [
      '@vuepress/medium-zoom', {
        /** 图片选择器 */
        // Selector: 'img.zoom-custom-imgs',

        /** 设置选项 */
        options: {
          /** 缩放后图片的外间距 */
          margin: 16,
          /** 关闭缩放需要滚动的像素数 */
          scrollOffset: 40
        }
      }
    ],

    /** Markdown 文件支持 TeX 语法 */
    ['vuepress-plugin-mathjax', (options.markdown || {}).mathjax !== false]
  ]
});

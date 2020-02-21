/* eslint-disable max-lines-per-function */
/*
 * @Author: Mr.Hope
 * @Date: 2019-10-20 16:48:11
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2020-02-21 10:53:22
 * @Description: 插件配置
 */
import * as moment from 'moment';
import { PluginConfig } from 'vuepress-types';
import { resolve } from 'path';

const pluginConfig = (options: any): PluginConfig[] => {
  // 设置作者
  if (options.comment && options.author)
    options.comment.author = options.author;

  return [
    // FIXME: 目前启用导航栏会报错，原因正在寻找中
    /** 使 VuePress 站点支持简洁链接 */
    // ['clean-urls', { normalSuffix: '/' }],

    /** 复制操作处理 */
    [
      'copyright',
      {
        authorName: options.author,
        minLength: 100,
        clipboardComponent: resolve(__dirname, '../components/Clipboard.vue')
      }
    ],

    /** 平滑滚动 */
    ['smooth-scroll', options.smoothScroll !== false],

    /** 博客插件 */
    [
      '@vuepress/plugin-blog',
      {
        frontmatters: [
          {
            id: 'tag',
            keys: ['tag', 'tags'],
            path: '/tag/',
            layout: 'BlogEntry',
            scopeLayout: 'BlogEntry'
          },
          {
            id: 'category',
            keys: ['category', 'categories'],
            path: '/category/',
            layout: 'BlogEntry',
            scopeLayout: 'BlogEntry'
            /*
             * },
             * {
             *   id: 'timeline',
             *   keys: ['timeline'],
             *   path: '/timeline/',
             *   layout: 'TimeLines',
             *   scopeLayout: 'TimeLine'
             */
          }
        ]
      }
    ],

    /** 更新时间插件 */
    [
      '@vuepress/last-updated',
      {
        /** 转换时间戳 */
        transformer: (timestamp: number, lang: string): string => {
          moment.locale(lang);

          return `${moment(timestamp).format('LL')} ${moment(timestamp).format(
            'HH:mm'
          )}`;
        }
      }
    ],

    /** 搜索插件 */
    [
      '@vuepress/search',
      {
        /** 搜索展示数量 */
        searchMaxSuggestions: 10
      }
    ],

    /** 图片缩放插件 */
    [
      '@vuepress/medium-zoom',
      {
        /** 设置选项 */
        options: {
          /** 缩放后图片的外间距 */
          margin: 16,
          /** 背景颜色 */
          background: '',
          /** 关闭缩放需要滚动的像素数 */
          scrollOffset: 40
        }
      }
    ],

    /** Chunk命名 */
    [
      'named-chunks',
      {
        pageChunkName: (page: any): string =>
          /^(?!\.)[^\\/:*?"<>|]{1,255}$/u.test(page.title)
            ? `page-${page.title}`
            : `page-${page.key.slice(1)}`,
        layoutChunkName: (layout: any): string =>
          `layout-${layout.componentName}`
      }
    ],

    /** typescript 支持 */
    ['typescript', {}],

    /** 评论插件 */
    ['@mr-hope/comment', options.comment === false ? false : options.comment],

    /** 全屏插件 */
    ['@mr-hope/components'],

    /** 分享插件 */
    // ['@mr-hope/share', options.share],

    /** Markdown 增强插件 */
    ['md-enhance', options.markdown || false],

    /** PWA 插件 */
    ['@mr-hope/pwa', options.pwa === false ? false : options.pwa],

    // /** 主题色插件 */
    ['@mr-hope/theme-color', options.themeColor]
  ];
};

export default pluginConfig;

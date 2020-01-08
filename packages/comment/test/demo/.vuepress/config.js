/*
 * @Author: Mr.Hope
 * @Date: 2019-07-05 00:14:26
 * @LastEditors  : Mr.Hope
 * @LastEditTime : 2020-01-07 17:28:13
 * @Description: Vuepress配置
 */

module.exports = {
  /** 部署目录 */
  base: process.env.VuePress_BASE || '/',

  /** 网站标题 */
  title: '评论插件',

  /** 网站在该语言下的描述 */
  description: 'Vuepress 的 评论插件',

  /** 生成网站头部的标签 */
  head: [
    // 设置网站图标
    ['link', { rel: 'icon', href: '/favicon.ico' }],

    // 设置网站作者
    ['meta', { name: 'author', content: 'Mr.Hope' }],

    // 移动端App体验
    [
      'meta',
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
      }
    ],

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

  /** 构建文件输出目录 */
  dest: './dist',

  /** 多语言配置选项
   *
   * 键名是该语言所属的子路径
   * 作为特例，默认语言可以使用 '/' 作为其路径。
   */
  locales: {
    /** 默认语言 */
    '/': {
      /** 设置为中文 */
      lang: 'zh-CN'
    },
    /** 英文设置 */
    '/en/': {
      /** 设置为英文 */
      lang: 'en-US', // 将会被设置为 <html> 的 lang 属性

      /** 网站在该语言下的标题 */
      title: 'Comment Plugin',

      /** 网站在该语言下的描述 */
      description: 'Comment Plugin for Vuepress'
    }
  },

  /** 主题配置 */
  themeConfig: {
    /** 网站的logo */
    logo: '/logo.svg',

    /** 头部导航栏的配置 */
    nav: [
      { text: '主页', link: '/' },
      {
        text: '指南',
        items: [
          { text: 'Valine', link: '/guide/valine.html' },
          { text: 'Vssue', link: '/guide/vssue.html' }
        ]
      },
      {
        text: '配置',
        items: [
          { text: 'API', link: '/api/' },
          { text: 'Valine', link: '/api/valine.html' },
          { text: 'Vssue', link: '/api/vssue.html' }
        ]
      }
    ],

    /** 侧边栏配置 */
    sidebar: {
      '/guide/': [
        '',
        'valine',
        {
          title: 'Vssue',
          children: [
            'vssue',
            {
              title: '支持平台',
              children: [
                'supported-platforms',
                'github',
                'gitlab',
                'gitee',
                'bitbucket'
              ]
            }
          ]
        }
      ],
      '/api/': ['', 'valine', 'vssue']
    },

    /** 侧边栏标题显示深度，0-2 */
    sidebarDepth: 2,

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
        editLinkText: 'Edit on Github',

        /** 该语言下头部导航栏的配置 */
        nav: [
          { text: 'Home', link: '/en/' },
          {
            text: 'Guide',
            items: [
              { text: 'Valine', link: '/en/guide/valine.html' },
              { text: 'Vssue', link: '/en/guide/vssue.html' }
            ]
          },
          {
            text: 'Config',
            items: [
              { text: 'API', link: '/en/api/' },
              { text: 'Valine', link: '/en/api/valine.html' },
              { text: 'Vssue', link: '/en/api/vssue.html' }
            ]
          }
        ],

        /** 该语言下侧边栏的配置 */
        sidebar: {
          '/en/guide/': [
            '',
            'valine',
            {
              title: 'Vssue',
              children: [
                'vssue',
                {
                  title: 'Supported platforms',
                  children: [
                    'supported-platforms',
                    'github',
                    'gitlab',
                    'gitee',
                    'bitbucket'
                  ]
                }
              ]
            }
          ],
          '/en/api/': ['', 'valine', 'vssue']
        }
      }
    },

    /** repo地址 */
    repo: 'https://github.com/mister-hope/vuepress-plugin-comment',

    /** 文档目录 */
    docsDir: 'docs',

    /** 自定义仓库链接文字 */
    repoLabel: 'Github',

    /** 开启编辑此页链接 */
    editLinks: true, // 默认是 false, 设置为 true 来启用

    /** 编辑此页链接提示文字 */
    editLinkText: '在 GitHub 上编辑此页' // 默认为 "Edit this page"
  },

  plugins: [
    /** 评论插件 */
    [
      require('../../../src'),
      {
        type: 'valine',
        author: 'Mr.Hope',
        appId: 'GG2VSnGiz09Rx18y2OUzdaHS-gzGzoHsz',
        appKey: 'fBf2dptTBHxNqALKrzUlBXeB'
      }
    ]
  ]
};

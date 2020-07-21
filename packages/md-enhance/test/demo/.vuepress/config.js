module.exports = {
  /** 部署目录 */
  base: process.env.VuePress_BASE || '/',

  /** 网站标题 */
  title: 'Markdown 增强',

  /** 网站在该语言下的描述 */
  description: 'Vuepress 的 Markdown 增强插件',

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
    ]
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
      title: 'Markdown Enhance Plugin',

      /** 网站在该语言下的描述 */
      description: 'Markdown Enhancement for Vuepress'
    }
  },

  /** 主题配置 */
  themeConfig: {
    /** 网站的logo */
    logo: '/logo.svg',

    /** 头部导航栏的配置 */
    nav: [
      { text: '主页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: '配置', link: '/api/' }
    ],

    /** 侧边栏配置 */
    sidebar: {
      '/guide/': ['', 'sup-sub', 'align', 'footnote', 'flowchart', 'tex'],

      '/': ['', 'guide/', 'api']
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
          { text: 'Guide', link: '/en/guide/' },
          { text: 'Config', link: '/en/api/' }
        ],

        /** 该语言下侧边栏的配置 */
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

    /** repo地址 */
    repo: 'https://github.com/mister-hope/vuepress-plugin-md-enhance',

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
    /** Markdown 增强 */
    [require('../../../lib'), { enableAll: true }]
  ]
};

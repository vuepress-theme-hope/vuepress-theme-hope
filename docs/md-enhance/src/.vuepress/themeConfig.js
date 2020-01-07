module.exports = {
  /** 网站的logo */
  logo: '/logo.svg',

  /** 头部导航栏的配置 */
  nav: [
    { text: '主页', icon: 'homefill', link: '/' },
    { text: '指南', icon: 'creativefill', link: '/guide/' },
    { text: '配置', icon: 'api', link: '/api.html' }
  ],

  /** 侧边栏配置 */
  sidebar: {
    '/guide/': ['', 'sup-sub', 'align', 'footnote', 'flowchart', 'tex'],

    '/': ['', 'guide/', 'api']
  },

  /** 默认作者 */
  author: 'Mr.Hope',

  /** 图标前缀 */
  iconPrefix: 'vuepress-',

  /** Markdown设置 */
  markdown: {
    enableAll: true
  },

  /** 语言设置 */
  locales: {
    /** 英文设置 */
    '/en/': {
      /** 该语言下头部导航栏的配置 */
      nav: [
        { text: 'Home', icon: 'homefill', link: '/en/' },
        { text: 'Guide', icon: 'creativefill', link: '/en/guide/' },
        { text: 'Config', icon: 'api', link: '/en/api.html' }
      ],

      /** 该语言下侧边栏的配置 */
      sidebar: {
        '/en/guide/': ['', 'sup-sub', 'align', 'footnote', 'flowchart', 'tex'],

        '/en/': ['', 'guide/', 'api']
      }
    }
  },

  /** repo地址 */
  repo: 'https://github.com/mister-hope/vuepress-theme-hope',

  /** 文档目录 */
  docsDir: 'docs/md-enhance'
};

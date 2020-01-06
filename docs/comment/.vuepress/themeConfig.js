module.exports = {
  /** 网站的logo */
  logo: '/logo.svg',

  /** 头部导航栏的配置 */
  nav: [
    { text: '主页', icon: 'homefill', link: '/' },
    {
      text: '指南',
      icon: 'creativefill',
      items: [
        { text: 'Valine', icon: 'valine', link: '/guide/valine.html' },
        { text: 'Vssue', icon: 'vssue', link: '/guide/vssue.html' }
      ]
    },
    {
      text: '配置',
      icon: 'api',
      items: [
        { text: 'API', icon: 'api', link: '/api/' },
        { text: 'Valine', icon: 'valine', link: '/api/valine.html' },
        { text: 'Vssue', icon: 'vssue', link: '/api/vssue.html' }
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
        icon: 'vssue',
        children: [
          'vssue',
          {
            title: '支持平台',
            icon: 'support',
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

  /** 图标前缀 */
  iconPrefix: 'vuepress-',

  /** Markdown设置 */
  markdown: {
    enableAll: true
  },

  /** 评论设置 */
  comment: {
    type: 'valine',
    appId: 'GG2VSnGiz09Rx18y2OUzdaHS-gzGzoHsz',
    appKey: 'fBf2dptTBHxNqALKrzUlBXeB'
  },

  /** 语言设置 */
  locales: {
    /** 英文设置 */
    '/en/': {
      /** 该语言下头部导航栏的配置 */
      nav: [
        { text: 'Home', icon: 'homefill', link: '/en/' },
        {
          text: 'Guide',
          icon: 'creativefill',
          items: [
            { text: 'Valine', icon: 'valine', link: '/en/guide/valine.html' },
            { text: 'Vssue', icon: 'vssue', link: '/en/guide/vssue.html' }
          ]
        },
        {
          text: 'Config',
          icon: 'api',
          items: [
            { text: 'API', icon: 'api', link: '/en/api/' },
            { text: 'Valine', icon: 'valine', link: '/en/api/valine.html' },
            { text: 'Vssue', icon: 'vssue', link: '/en/api/vssue.html' }
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
            icon: 'vssue',
            children: [
              'vssue',
              {
                title: 'Supported platforms',
                icon: 'support',
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
  repo: 'https://github.com/mister-hope/vuepress-theme-hope',

  /** 文档目录 */
  docsDir: 'docs/comment'
};

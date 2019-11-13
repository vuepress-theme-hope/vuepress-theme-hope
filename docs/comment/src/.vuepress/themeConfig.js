module.exports = {
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
  repo: 'https://github.com/mister-hope/vuepress-theme-hope',

  /** 文档目录 */
  docsDir: 'docs/comment'
};

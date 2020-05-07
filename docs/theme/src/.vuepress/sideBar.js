module.exports = {
  zh: {
    '/guide/': [
      {
        title: '快速上手',
        icon: 'creativefill',
        collapsable: false,
        children: ['', 'install']
      },
      {
        title: '新增功能',
        icon: 'discoverfill',
        prefix: 'feature/',
        collapsable: false,
        children: [
          '',
          'theme',
          'page-info',
          'comment',
          'blog',
          'encrypt',
          {
            title: 'Markdown 增强',
            icon: 'markdown',
            prefix: 'markdown/',
            children: [
              '',
              'align',
              'sup-sub',
              'footnote',
              'mark',
              'tex',
              'flowchart'
            ]
          },
          'component',
          'typescript'
        ]
      },
      {
        title: '布局',
        icon: 'layout',
        prefix: 'layout/',
        collapsable: false,
        children: ['', 'navbar', 'sidebar', 'page', 'home', 'blog']
      }
    ],

    '/config/': [
      '',
      'themeConfig',
      'page',
      'stylus',
      {
        title: '插件配置',
        icon: 'extension',
        prefix: 'plugin/',
        collapsable: false,
        children: ['', 'container', 'copyright', 'medium-zoom', 'pwa']
      }
    ],

    '/basic/': [
      {
        title: 'Markdown',
        prefix: 'markdown/',
        icon: 'markdown',
        collapsable: false,
        children: [
          '',
          'demo',
          {
            title: 'Emoji',
            icon: 'emoji',
            prefix: 'emoji/',
            children: ['', 'people', 'nature', 'object', 'locate', 'symbol']
          }
        ]
      },
      {
        title: 'Vuepress',
        prefix: 'vuepress/',
        icon: 'vue',
        collapsable: false,
        children: [
          '',
          'file',
          'plugin',
          'theme/',
          'theme/config',
          'command',
          'case'
        ]
      }
    ],

    '/': ['', 'guide/', 'config/', 'basic/', 'FAQ/', 'demo/']
  },
  en: {
    '/en/guide/': [
      {
        title: 'Get Started',
        icon: 'creativefill',
        collapsable: false,
        children: ['', 'install']
      },
      {
        title: 'New Features',
        icon: 'discoverfill',
        prefix: 'feature/',
        collapsable: false,
        children: [
          '',
          'theme',
          'page-info',
          'comment',
          'blog',
          'encrypt',
          {
            title: 'Markdown enhance',
            icon: 'markdown',
            prefix: 'markdown/',
            children: [
              '',
              'align',
              'sup-sub',
              'footnote',
              'mark',
              'tex',
              'flowchart'
            ]
          },
          'component',
          'typescript'
        ]
      },
      {
        title: 'Outlook',
        icon: 'layout',
        prefix: 'layout/',
        collapsable: false,
        children: ['', 'navbar', 'sidebar', 'page', 'home', 'blog']
      }
    ],

    '/en/config/': [
      '',
      'themeConfig',
      'page',
      'stylus',
      {
        title: 'Plugins',
        icon: 'extension',
        prefix: 'plugin/',
        collapsable: false,
        children: ['', 'container', 'copyright', 'medium-zoom', 'pwa']
      }
    ],

    '/en/basic/': [
      {
        title: 'Markdown',
        icon: 'markdown',
        prefix: 'markdown/',
        collapsable: false,
        children: ['', 'demo', 'emoji']
      },
      {
        title: 'Vuepress',
        icon: 'vue',
        prefix: 'vuepress/',
        collapsable: false,
        children: [
          '',
          'file',
          'plugin',
          'theme/',
          'theme/config',
          'command',
          'case'
        ]
      }
    ],

    '/en/': ['', 'guide/', 'config/', 'basic/', 'FAQ/', 'demo/']
  }
};

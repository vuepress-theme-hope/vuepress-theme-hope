/*
 * @Author: Mr.Hope
 * @Date: 2019-10-11 12:43:31
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-11-07 23:49:00
 * @Description: 侧边栏配置
 */

module.exports = {
  zh: {
    '/guide/': [
      {
        title: '快速上手',
        icon: 'creative',
        children: ['', 'install']
      },
      {
        title: '外观',
        icon: 'skinfill',
        children: ['navbar', 'sidebar', 'breadcrumb', 'page']
      },
      {
        title: '新增功能',
        icon: 'skinfill',
        children: ['themecolor', 'fullscreen', 'comment', 'component']
      },
      {
        title: 'Markdown 增强',
        icon: 'markdown',
        prefix: 'markdown/',
        children: ['', 'sup-sub', 'footnote', 'tex', 'flowchart']
      }
    ],

    '/api/': [
      '',
      'themeConfig',
      'page',
      'stylus',
      {
        title: '插件配置',
        prefix: 'plugin/',
        icon: 'extension',
        children: [
          '',
          'copyright',
          'medium-zoom',
          'pwa'
        ]
      }
    ],

    // fallback
    '/basic/': [
      {
        title: 'Markdown',
        prefix: 'markdown/',
        icon: 'markdown',
        children: ['', 'demo', 'emoji']
      },
      {
        title: 'Vuepress',
        prefix: 'vuepress/',
        icon: 'vue',
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

    '/': ['', 'guide/', 'api/', 'basic/']
  },
  en: {
    '/en/guide/': [
      {
        title: 'Get Started',
        icon: 'creative',
        children: ['', 'install']
      },
      {
        title: 'Outlook',
        icon: 'skinfill',
        children: ['navbar', 'sidebar', 'breadcrumb', 'page']
      },
      {
        title: 'New Feature',
        icon: 'skinfill',
        children: ['themecolor', 'fullscreen', 'comment', 'component']
      },
      {
        title: 'Markdown Enhance',
        icon: 'markdown',
        prefix: 'markdown/',
        children: ['', 'sup-sub', 'footnote', 'tex', 'flowchart']
      }
    ],

    '/en/api/': [
      '',
      'themeConfig',
      'page',
      'stylus',
      {
        title: 'Plugin Config',
        prefix: 'plugin/',
        icon: 'extension',
        children: [
          '',
          'copyright',
          'medium-zoom',
          'pwa'
        ]
      }
    ],

    // fallback
    '/en/basic/': [
      {
        title: 'Markdown',
        prefix: 'markdown/',
        icon: 'markdown',
        children: ['', 'demo', 'emoji']
      },
      {
        title: 'Vuepress',
        prefix: 'vuepress/',
        icon: 'vue',
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

    '/en/': ['', 'guide/', 'api/', 'basic/']
  }
};

/*
 * @Author: Mr.Hope
 * @Date: 2019-10-11 12:43:31
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-10-23 00:02:32
 * @Description: 侧边栏配置
 */

module.exports = {
  zh: {
    '/guide/': [
      {
        title: '快速上手',
        icon: 'creative',
        children: [
          '',
          'install',
          {
            title: '增强功能',
            icon: 'extension',
            prefix: 'enhance/',
            children: ['markdown']
          }
        ]
      }
    ],

    '/api/': ['', 'page'],

    '/': ['', 'guide/', 'api/']
  },
  en: {
    '/en/guide/': [
      {
        title: 'Get Started',
        icon: 'creative',
        children: [
          '',
          {
            title: 'Install / Usage',
            icon: 'install',
            prefix: 'more/',
            children: ['use', 'install']
          }
        ]
      }
    ],

    '/en/api/': ['', 'page'],

    '/en/': ['', 'guide/', 'api/']
  }
};

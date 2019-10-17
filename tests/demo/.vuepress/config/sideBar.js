/*
 * @Author: Mr.Hope
 * @Date: 2019-10-11 12:43:31
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-10-14 20:54:25
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
          {
            title: '安装 / 使用',
            icon: 'install',
            prefix: 'more/',
            children: ['use', 'install']
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

/*
 * @Author: Mr.Hope
 * @Date: 2019-10-11 12:43:31
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-11-08 21:04:25
 * @Description: 侧边栏配置
 */

module.exports = {
  zh: {
    '/test/': [
      {
        title: '测试',
        icon: 'creative',
        children: [
          '',
          {
            title: '更多测试',
            icon: 'extension',
            prefix: 'detail/',
            children: ['page', 'markdown']
          },
          {
            title: '页脚测试',
            icon: 'extension',
            prefix: 'footer/',
            children: ['', 'text', 'default', 'link', 'outlink', 'diy']
          }
        ]
      }
    ],

    '/': ['', 'test/']
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

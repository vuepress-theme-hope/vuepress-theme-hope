/*
 * @Author: Mr.Hope
 * @Date: 2019-10-11 12:43:31
 * @LastEditors  : Mr.Hope
 * @LastEditTime : 2020-01-29 13:15:50
 * @Description: 侧边栏配置
 */

module.exports = {
  zh: {
    '/': [
      '',
      {
        title: '组件测试',
        icon: 'extension',
        prefix: 'component/',
        children: [
          '',
          'disable',
          'pageInfo',
          {
            title: '页脚测试',
            icon: 'extension',
            prefix: 'footer/',
            children: ['', 'text', 'default', 'link', 'outlink', 'diy']
          }
        ]
      }
    ]
  },
  en: ['']
};

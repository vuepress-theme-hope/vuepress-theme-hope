/*
 * @Author: Mr.Hope
 * @Date: 2019-10-11 12:43:31
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-11-08 21:03:11
 * @Description: 导航栏配置
 */

module.exports = {
  zh: [
    { text: '主页', link: '/', icon: 'homefill' },
    {
      text: '测试',
      icon: 'infofill',
      items: [
        { text: '测试列表', link: '/test/', icon: 'debug' },
        { text: '页脚测试', link: '/test/footer/', icon: 'footer' }
      ]
    },
    {
      text: '主题文档',
      link: 'https://vuepress-theme.mrhope.site',
      icon: 'note'
    }
  ],
  en: [
    { text: 'Home', link: '/en/', icon: 'homefill' },
    {
      text: 'Docs',
      link: 'https://vuepress-theme.mrhope.site/en/',
      icon: 'note'
    }
  ]
};

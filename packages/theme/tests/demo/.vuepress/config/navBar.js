/*
 * @Author: Mr.Hope
 * @Date: 2019-10-11 12:43:31
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-10-17 20:40:15
 * @Description: 导航栏配置
 */

module.exports = {
  zh: [
    { text: '主页', link: '/', icon: 'homefill' },
    {
      text: '基础', icon: 'infofill', items: [
        { text: '指南', link: '/guide/', icon: 'creativefill' },
        { text: '配置', link: '/api/', icon: 'code' }
      ]
    },
    { text: '文档', link: 'https://vuepress-theme.mrhope.site', icon: 'note' }
  ],
  en: [
    { text: 'Home', link: '/en/', icon: 'homefill' },
    {
      text: 'Basic', icon: 'infofill', items: [
        { text: 'Guide', link: '/en/guide/', icon: 'creativefill' },
        { text: 'Config', link: '/en/api/', icon: 'code' },
      ]
    },
    { text: 'Docs', link: 'https://vuepress-theme.mrhope.site/en/', icon: 'note' }
  ]
};

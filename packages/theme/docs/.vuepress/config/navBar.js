/*
 * @Author: Mr.Hope
 * @Date: 2019-10-11 12:43:31
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-11-07 19:57:14
 * @Description: 导航栏配置
 */

module.exports = {
  zh: [
    { text: '主页', link: '/', icon: 'homefill' },
    { text: '指南', link: '/guide/', icon: 'creativefill' },
    { text: '配置', link: '/api/', icon: 'code' },
    {
      text: '基础',
      icon: 'infofill',
      items: [
        { text: 'Markdown', link: '/basic/markdown/', icon: 'markdown' },
        { text: 'Vuepress', link: '/basic/vuepress/', icon: 'vue' }
      ]
    }
  ],
  en: [
    { text: 'Home', link: '/en/', icon: 'homefill' },
    { text: 'Guide', link: '/en/guide/', icon: 'creativefill' },
    { text: 'Config', link: '/en/api/', icon: 'code' },
    {
      text: 'Basic',
      icon: 'infofill',
      items: [
        { text: 'Markdown', link: '/en/basic/markdown/', icon: 'markdown' },
        { text: 'Vuepress', link: '/en/basic/vuepress/', icon: 'vue' }
      ]
    }
  ]
};

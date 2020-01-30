/*
 * @Author: Mr.Hope
 * @Date: 2019-10-11 12:43:31
 * @LastEditors  : Mr.Hope
 * @LastEditTime : 2020-01-30 18:34:46
 * @Description: 导航栏配置
 */

module.exports = {
  zh: [
    { text: '主页', link: '/', icon: 'homefill' },
    { text: '指南', link: '/guide/', icon: 'creativefill' },
    { text: '配置', link: '/api/', icon: 'api' },
    {
      text: '基础',
      icon: 'infofill',
      items: [
        { text: 'Markdown', link: '/basic/markdown/', icon: 'markdown' },
        { text: 'Vuepress', link: '/basic/vuepress/', icon: 'vue' }
      ]
    },
    {
      text: '项目',
      icon: 'infofill',
      items: [
        {
          text: '更新日志',
          link:
            'https://github.com/Mister-Hope/vuepress-theme-hope/blob/master/CHANGELOG.md'
        },
        {
          text: '项目地址',
          link: 'https://github.com/mister-hope/vuepress-theme-hope'
        }
      ]
    }
  ],
  en: [
    { text: 'Home', link: '/en/', icon: 'homefill' },
    { text: 'Guide', link: '/en/guide/', icon: 'creativefill' },
    { text: 'Config', link: '/en/api/', icon: 'api' },
    {
      text: 'Basic',
      icon: 'infofill',
      items: [
        { text: 'Markdown', link: '/en/basic/markdown/', icon: 'markdown' },
        { text: 'Vuepress', link: '/en/basic/vuepress/', icon: 'vue' }
      ]
    },
    {
      text: 'Project',
      icon: 'infofill',
      items: [
        {
          text: 'Changelog',
          link:
            'https://github.com/Mister-Hope/vuepress-theme-hope/blob/master/CHANGELOG.md'
        },
        {
          text: 'Repo',
          link: 'https://github.com/mister-hope/vuepress-theme-hope'
        }
      ]
    }
  ]
};

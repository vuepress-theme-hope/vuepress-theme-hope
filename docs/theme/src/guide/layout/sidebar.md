---
icon: sidebar
tags: 
  - enhance
  - layout
category: layout
---

# 侧边栏

## 原有配置增强

- 图标支持

  默认启用图标支持，将在侧边栏的链接前显示页面的图标。可以在 `themeConfig` 中将 `sidebarIcon` 设置为 `false` 来禁用它。

- 分组增强

  可以在 SidebarGroupItem 中使用

  - `prefix`: 来添加默认的路径前缀。
  - `icon`: 添加图标

::: details 本文档的侧边栏配置

```js {4-75}
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: {
      '/guide/': [
        {
          title: '快速上手',
          icon: 'creative',
          children: ['', 'install']
        },
        {
          title: '外观',
          icon: 'skinfill',
          children: ['navbar', 'sidebar', 'breadcrumb', 'page', 'home']
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
          children: ['', 'copyright', 'medium-zoom', 'pwa']
        }
      ],

      '/basic/': [
        {
          title: 'Markdown',
          prefix: 'markdown/',
          icon: 'markdown',
          children: [
            '',
            'demo',
            {
              title: 'Emoji',
              prefix: 'emoji/',
              icon: 'emoji',
              children: ['', 'people', 'nature', 'object', 'locate', 'symbol']
            }
          ]
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

      '/': ['', 'guide/', 'api/', 'basic/', 'FAQ/']
    }
  }
};
```

:::

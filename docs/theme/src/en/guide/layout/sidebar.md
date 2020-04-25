---
icon: sidebar
tags:
  - enhance
  - layout
category: layout
---

# Sidebar

## Enhancement

- Icon Support

  Icon support is enabled by default and the icon for the page will be displayed before the link in the sidebar. It can be disabled in `themeConfig.sidebarIcon`.

- Group Enhancement

  You can used these in SidebarGroupItem:

  - `prefix`: add a default path prefix.
  - `icon`: add icon

::: details Example

Configuration of this documentation:

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: {
      '/en/guide/': [
        {
          title: 'Get Started',
          icon: 'creativefill',
          children: ['', 'install']
        },
        {
          title: 'Outlook',
          icon: 'layout',
          prefix: 'layout/',
          children: ['', 'navbar', 'sidebar', 'breadcrumb', 'page', 'home']
        },
        {
          title: 'New Features',
          icon: 'discoverfill',
          prefix: 'feature/',
          children: [
            '',
            'icon',
            'comment',
            'themecolor',
            'encrypt',
            'component',
            'fullscreen',
            'typescript'
          ]
        },
        {
          title: 'Markdown enhance',
          icon: 'markdown',
          prefix: 'markdown/',
          children: ['', 'align', 'sup-sub', 'footnote', 'tex', 'flowchart']
        }
      ],

      '/en/api/': [
        '',
        'themeConfig',
        'page',
        'stylus',
        {
          title: 'Plugins',
          prefix: 'plugin/',
          icon: 'extension',
          children: [
            '',
            'container',
            'copyright',
            'md-enhance',
            'medium-zoom',
            'pwa'
          ]
        }
      ],

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

      '/en/': ['', 'guide/', 'api/', 'basic/', 'FAQ/']
    }
  }
};
```

:::

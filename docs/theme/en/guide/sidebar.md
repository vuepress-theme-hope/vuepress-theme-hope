---
icon: sidebar
---

# Sidebar

## Icon Support

Icon support is enabled by default and the icon for the page will be displayed before the link in the sidebar. It can be disabled in `themeConfig.sidebarIcon`.

## Group Enhancement

You can used these in SidebarGroupItem:

- `prefix`: add a default path prefix.
- `icon`: add icon

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: {
      '/': [
        {
          title: 'Vue Cli',
          prefix: 'cli/',
          icon: 'vue',
          children: [
            '',
            'intro',
            'quickDev',
            'create',
            'file'
          ]
        },
        {
          title: 'Vuex',
          icon: 'state',
          prefix: 'vuex/',
          children: [
            '',
            'demo',
          ]
        }
      ]
    }
  }
};
```

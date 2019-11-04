---
icon: sidebar
---

# 侧边栏

## 图标支持

默认启用图标支持，将在侧边栏的链接前显示页面的图标。可以在 `themeConfig.sidebarIcon` 中禁用它。

## 分组增强

可以在 SidebarGroupItem 中使用

- `prefix`: 来添加默认的路径前缀。
- `icon`: 添加图标

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

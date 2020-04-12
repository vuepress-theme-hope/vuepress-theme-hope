---
icon: nav
tags: 
  - enhance
  - layout
category: layout
---

# 导航栏

## 原有配置增强

- 前缀支持

  主题配置中的 NavBarItem 新增 `prefix` 字段，填入即可为子菜单添加前缀。

- 图标支持

  主题配置中的 NavBarItem 新增 `icon` 字段，填入对应图标的 FontClass 即可显示对应图标。

::: details 本文档的导航栏配置

```js {4-18}
// .vuepress/config.js
module.exports = {
  themeConfig: {
    nav: [
      // 可在每一项中添加 icon 字段来显示图标
      { text: '主页', link: '/', icon: 'homefill' },
      { text: '指南', link: '/guide/', icon: 'creativefill' },
      { text: '配置', link: '/api/', icon: 'code' },
      {
        text: '基础',
        icon: 'infofill',
        prefix: '/basic/',
        items: [
          { text: 'Markdown', link: 'markdown', icon: 'markdown' },
          { text: 'Vuepress', link: 'vuepress/', icon: 'vue' }
        ]
      }
    ]
  }
}
```

:::

## 导航栏新增

- 样式更改

  全新设计的导航栏包含了底部的阴影。导航栏的非激活状态链接的文字颜色变浅。

  同时，搜索框的样式也调整为圆角矩形，并加深了搜索框的背景色。

- repo 隐藏

  可以将 `themeConfig` 中设置 `repoDisplay` 为 `false` 来取消导航栏右侧的库链接显示。

- 主题色切换按钮

  具体详情请见 [主题色](../feature/themecolor.md) 章节。

- 深色模式切换按钮

  具体详情请见 [深色模式](../feature/darkmode.md) 章节。

- 全屏按钮

  具体详情请见 [全屏按钮](../feature/fullscreen.md) 章节。

---
icon: nav
---

# 导航栏

## 对默认主题的改进

- 前缀支持

    主题配置中的 NavBarItem 新增 `prefix` 字段，填入即可为子菜单添加前缀。

- 图标支持

  主题配置中的 NavBarItem 新增 `icon` 字段，填入对应图标的 FontClass 即可显示对应图标。

下面是本文档的导航栏配置：

```js
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
    ],

  }
}
```

- 样式更改

    全新设计的导航栏包含了底部的阴影。

- repo 隐藏

    可以将 `themeConfig` 中的 `repoDisplay` 设置为 `false` 来取消导航栏右侧的库链接显示。

## 新功能

### 主题色与夜间模式按钮

具体详情请见 [主题色](themecolor.md) 章节。

### 全屏按钮

具体详情请见 [全屏按钮](fullscreen.md) 章节。

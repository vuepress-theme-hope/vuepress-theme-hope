---
icon: nav
---

# 导航栏

## 图标支持

主题配置中的 NavBarItem 新增 `icon` 字段，填入对应图标的 FontClass 即可显示对应图标。

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
        text: '基础', icon: 'infofill', items: [
          { text: 'Markdown', link: '/basic/markdown', icon: 'markdown' },
          { text: 'Vuepress', link: '/basic/vuepress/', icon: 'vue' }
        ]
      }
    ],

  }
}
```

## 主题色与夜间模式按钮

具体详情请见 [主题色](themecolor.md) 章节。

## 全屏按钮 <MyBadge text="Beta" type="warning" />

默认启用，可在主题配置中将 `fullscreen` 设置为 `false` 将其取消。

::: tip
目前此功能处于 beta 阶段，后续会自动根据浏览器判断，当遇到不支持全屏的环境时自动隐藏。
:::

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    fullsreen: false // 默认启用，设置false将其关闭
  }
}
```

## 其他增强

### 样式更改

全新设计的导航栏包含了底部的阴影。

### repo 隐藏

可以将 `.vuepress/config.js` 中的 `themeConfig.repoDisplay` 设置为 `false` 来取消导航栏右侧的库链接显示。

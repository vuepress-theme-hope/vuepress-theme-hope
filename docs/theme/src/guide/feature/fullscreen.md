---
icon: full-screen
category: function
tag:
  - fullscreen
  - function
---

# 全屏按钮

默认启用，可在主题配置中将 `fullscreen` 设置为 `false` 将其取消。

::: tip
如果当前浏览器不支持全屏，则全屏按钮会自动隐藏。
:::

```js {4}
// .vuepress/config.js
module.exports = {
  themeConfig: {
    fullscreen: false // 默认启用，设置 false 将其关闭
  }
}
```

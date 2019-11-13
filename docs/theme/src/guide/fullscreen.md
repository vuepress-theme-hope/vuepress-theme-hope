---
icon: full-screen
---

# 全屏按钮 <MyBadge text="Beta" type="warning" />

vuepress-theme-hope 通过内置 `@mr-hope/vuepress-plugin-full-screen`，实现了主题色与夜间模式功能。

`.vuepress/config.js` 中的 `themeConfig.fullscreen` 会直接传递给插件作为插件选项。

默认启用，可在主题配置中将 `fullscreen` 设置为 `false` 将其取消。

::: tip
目前此功能处于 beta 阶段，后续会自动根据浏览器判断，当遇到不支持全屏的环境时自动隐藏。
:::

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    fullscreen: false // 默认启用，设置 false 将其关闭
  }
}
```

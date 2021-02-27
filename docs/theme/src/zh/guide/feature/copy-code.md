---
title: 代码复制
icon: copy
category: feature
tags:
  - copy code
  - feature
---

如果你是一个程序员，你可能希望你的用户能够一键复制你在正文中展示的代码。

针对这一情况，`vuepress-theme-hope` 内置了 [@mr-hope/copy-code](https://vuepress-theme-hope.github.io/copy-code/zh/)，提供了一个复制按钮。

<!-- more -->

## 使用

启用后，本插件会自动添加复制按钮到每个代码块的右下角。

默认情况下，按钮仅在桌面模式显示，如果你需要在移动端展示这个按钮，请将 `themeConfig.copyCode.showInMobile` 设置为 `true`。

在用户点击复制按钮后，屏幕上会显示一个复制成功的提示。默认的提示时长为 2000ms，如果你需要更改这个时长，请设置 `themeConfig.copyCode.duration`(单位 ms)，如果你不需要这个提示，请将 `themeConfig.copyCode.duration` 设置为 `0`。

## 效果

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    copyCode: {},
  },
};
```

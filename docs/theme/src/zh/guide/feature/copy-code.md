---
title: 代码复制
icon: copy
category:
  - 功能
tag:
  - 功能
  - 代码复制
---

如果你是一个程序员，你可能希望你的用户能够一键复制你在正文中展示的代码。

针对这一情况，`vuepress-theme-hope` 内置了 <ProjectLink name="copy-code2" path="/zh/">vuepress-plugin-copy-code2</ProjectLink>，提供了一个复制按钮。

::: info

`vuepress-theme-hope` 将主题选项中的 `plugins.copyCode` 选项作为插件选项提供给 `vuepress-plugin-copy-code2`。

:::

<!-- more -->

## 使用

启用后，此插件会自动添加复制按钮到每个代码块的右上角。

默认情况下，按钮仅在桌面模式显示，如果你需要在移动端展示这个按钮，请在主题选项中设置 `plugins.copyCode.showInMobile: true`。

在用户点击复制按钮后，屏幕上会显示一个复制成功的提示。默认的提示时长为 2000ms，如果你需要更改这个时长，请在主题选项中设置 `plugins.copyCode.duration` (单位 ms)，如果你不需要这个提示，请设置 `duration` 设为 `0`。

## 效果

```js
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      copyCode: {},
    },
  }),
};
```

---
title: 指南
icon: lightbulb
---

此插件会自动添加复制按钮到每个代码块的右上角。

## 代码块选择

插件默认会按照默认主题的选择器选中代码块，如果你在使用第三方主题，你可以将一个或多个 CSS 选择器设置给 `selector` 选项。

## 按钮展示

默认情况下，按钮仅在桌面模式显示，如果你需要在移动端展示这个按钮，请将 `showInMobile` 设置为 `true`。

## 复制提示

在用户点击复制按钮后，屏幕上会显示一个复制成功的提示。

默认提示时长为 2000ms，设置 `duration`（单位为毫秒）以修改此时长。将 `duration` 设置为 `0` 可禁用提示。

## Fancy 模式

默认情况下，复制按钮仅会在鼠标悬停代码块时显示。

如果你就是为了展示一些供他人复制的代码，你可以添加 `fancy: true` 选项。这会在每个代码块右下角渲染一个醒目的复制按钮。

## 多语言配置

你可以通过 `locales` 来新增特定语言的多语言配置或修改已支持语言的配置。

```ts
import { defineUserConfig } from "vuepress";
import { copyCodePlugin } from "vuepress-plugin-copy-code2";

export default defineUserConfig({
  locales: {
    "/": {
      // 这是一个支持的语言
      lang: "zh-CN",
    },
    "/xx/": {
      // 这是一个没有收到插件支持的语言
      lang: "mm-NN",
    },
  },

  plugins: [
    copyCodePlugin({
      locales: {
        "/": {
          // 覆盖复制按钮标签文字
          copy: "复制此段代码",
        },

        "/xx/": {
          // 在这里完整设置 `mm-NN` 的多语言配置
        },
      },
    }),
  ],
});
```

For specific options, see [Config → Locale Settings](./config.md#locales).

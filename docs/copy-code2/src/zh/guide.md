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

在用户点击复制按钮后，屏幕上会显示一个复制成功的提示。默认的提示时长为 2000ms，如果你需要更改这个时长，请设置 `duration`(单位 ms)，如果你不需要这个提示，请将 `duration` 设置为 `0`。

## 纯净模式

默认情况下插件会展示一个较大的蓝色按钮，如果你希望让按钮和提示没有那么“显眼”，你可以添加 `pure: true` 选项。

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

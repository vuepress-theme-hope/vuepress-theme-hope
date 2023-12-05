---
title: 指南
icon: lightbulb
---

此插件可以在访问者从你的站点复制内容时，自动追加版权信息，也可以禁止站点的复制或者选择。

<!-- more -->

## 使用

此插件，默认全局禁用，你需要在需要的页面的 frontmatter 中设置 `copy: true` 手动开启。当然，你可以在插件选项中设置 `global: true` 让其全局生效，并在个别页面的 frontmatter 中设置 `copy: false` 禁用它。

处于不打扰用户的考虑，默认配置下，仅当用户复制字符长度不小于 `100` 时，才会触发追加版权信息，如果你希望改变这个触发值，请设置 `triggerLength`，同时该选项支持在 frontmatter 中通过 `copy.triggerLength` 单独设置。

如果你希望禁止用户复制较长内容，你可以设置 `maxLength`，同时该选项支持在 frontmatter 中通过 `copy.maxLength` 单独设置。

## 禁用复制和选择

- 如果你不希望用户复制你的整个站点或特定页面文字，你可以在插件选项中设置 `disableCopy` 或在页面 frontmatter 中设置 `copy.disableCopy` 来禁用复制，后者具有更高优先级。
- 如果你不希望用户选择你的整个站点或特定页面文字，你可以在插件选项中设置 `disableSelection` 或在页面 frontmatter 中设置 `copy.disableSelection` 来禁用选择，后者具有更高优先级。

## 版权信息获取

你可以通过插件的 `author` 和 `license` 选项设置作者和协议信息。如果文档的不同部分拥有不同的作者和协议，你可以传入一个使用当前页面对象作为参数的函数 `(page: Page) => string` 返回相应信息。

## 自定义版权信息文字

你可以通过插件的 `locales` 选项新增特定语言的版权信息文字或修改已支持语言的版权信息文字，详见 [配置 → locales](config.md#locales)。

```ts
import { defineUserConfig } from "vuepress";
import { searchProPlugin } from "vuepress-plugin-search-pro";

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
    searchProPlugin({
      locales: {
        "/": {
          // 覆盖链接文字
          link: "原文发表于 :link",
        },

        "/xx/": {
          // 在这里完整设置 `mm-NN` 的多语言配置
        },
      },
    }),
  ],
});
```

具体的选项详见 [配置 → 多语言配置](./config.md#locales)。

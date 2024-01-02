---
title: 指南
icon: lightbulb
---

此插件可以在访问者从你的站点复制内容时，自动追加版权信息，也可以禁止站点的复制或者选择。

<!-- more -->

## 使用

此插件**默认全局禁用**。你可以:

- 在特定页面的 frontmatter 中设置 `copy: true` 手动开启。
- 在插件选项中设置 `global: true` 让其全局生效，并在页面的 frontmatter 中设置 `copy: false` 禁用它。

处于不打扰用户的考虑，默认配置下仅当复制长度超过 100 时才会追加版权信息。如果你希望改变这个触发值，你可以插件选项中设置 `triggerLength`，或在页面 frontmatter 单独设置 `copy.triggerLength`。

如果你希望禁止用户复制较长内容，你可以在插件选项中设置 `maxLength` 控制这个临界值，或在页面 frontmatter 单独设置 `copy.maxLength`。

## 禁用复制和选择

- 如果你不希望用户复制你的整个站点或特定页面文字，你可以在插件选项中设置 `disableCopy` 或在页面 frontmatter 中设置 `copy.disableCopy` 来禁用复制，后者具有更高优先级。
- 如果你不希望用户选择你的整个站点或特定页面文字，你可以在插件选项中设置 `disableSelection` 或在页面 frontmatter 中设置 `copy.disableSelection` 来禁用选择。

后者具有更高优先级。

## 版权信息获取

你可以通过插件的 `author` 和 `license` 选项设置全局作者和协议信息。

如果文档的不同部分拥有不同的作者和协议，你可以通过 `authorGetter` 和 `licenseGetter` 传入一个使用当前页面对象作为参数的函数 `(page: Page) => string` 并通过它返回相应信息。

## 自定义版权信息文字

你可以通过插件的 `locales` 选项新增特定语言的版权信息文字或修改已支持语言的版权信息文字。

```ts
import { defineUserConfig } from "vuepress";
import { copyrightPlugin } from "vuepress-plugin-copyright2";

export default defineUserConfig({
  locales: {
    "/": {
      // this is a supported language
      lang: "en-US",
    },
    "/xx/": {
      // the plugin does not support this language
      lang: "mm-NN",
    },
  },

  plugins: [
    copyrightPlugin({
      locales: {
        "/": {
          // Override link text
          link: "Original posted at :link",
        },

        "/xx/": {
          // Complete locale config for `mm-NN` language here
        },
      },
    }),
  ],
});
```

具体选项参见 [配置 → locales](./config.md#locales).

如果你觉得通过模板追加版权信息的方式不够灵活，你可以设置 `copyrightGetter` 选项来通过 Page 对象返回一个完全由你自定义的版权信息，或返回 null 以使用默认模板。

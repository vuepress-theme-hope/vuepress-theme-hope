---
title: 指南
icon: creative
---

此插件可以在访问者从你的站点复制内容时，自动追加版权信息，也可以禁止站点的复制或者选择。

<!-- more -->

## 使用

此插件，默认全局禁用，你需要在需要的页面的 frontmatter 中设置 `copy: true` 手动开启。当然，你可以在插件选项中设置 `global: true` 让其全局生效，并在个别页面的 frontmatter 中设置 `copy: false` 禁用它。

处于不打扰用户的考虑，默认配置下，仅当用户复制字符长度不小于 `100` 时，才会触发追加版权信息，如果你希望改变这个触发值，请设置 `triggerWords`，同时该选项支持在 frontmatter 中通过 `copy.triggerWord` 单独设置。

## 禁用复制和选择

- 如果你不希望用户复制你的整个站点或特定页面文字，你可以在插件选项或在页面 frontmatter 中设置 `disableCopy` 来禁用复制，后者具有更高优先级。
- 如果你不希望用户选择你的整个站点或特定页面文字，你可以在插件选项或在页面 frontmatter 中设置 `disableSelection` 来禁用选择，后者具有更高优先级。

## 版权信息获取

你可以通过插件的 `author` 和 `license` 选项设置作者和协议信息。如果文档的不同部分拥有不同的作者和协议，你可以传入一个使用当前页面对象作为参数的函数 `(page: Page) => string` 返回相应信息。

## 自定义文字

你可以通过插件的 `locales` 选项配置插件在不同语言下的版权信息文字，详见 [配置 → locales](config.md#locales)。

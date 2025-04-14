---
title: 页脚支持
icon: fas fa-window-maximize fa-rotate-180
category:
  - 布局
order: 5
tag:
  - 布局
  - 页脚
---

`vuepress-theme-hope` 为所有页面提供了页脚功能。

<!-- more -->

## 介绍

页脚包含可自定义的页脚内容和版权信息。

你可以在主题选项中设置 `footer`，`copyright` `license` 全局设置默认的页脚内容与版权信息。

::: info 多语言配置支持

你可以在主题选项中通过 `locales` 为每个语言分别设置这些选项。

:::

你也可以在页面 frontmatter 中配置 `footer`，`copyright` 和 `license` 字段，指定特定页面的页脚内容。

## 页脚配置

页脚的内容会通过 `v-html` 插入，因此同时支持 HTML 和纯文本，你可以在主题选项中通过 `footer` 选项设置全局内容。

页脚是默认隐藏的。如果希望默认全局显示，请在主题选项中设置 `displayFooter: true`。

- 当全局显示页脚未开启时，在页面 Frontmatter 中将 `footer` 设置为 `true` 会显示默认的页脚文字。
- 当全局显示页脚已开启时，在页面 Frontmatter 中将 `footer` 设置为 `false` 会禁用默认的页脚。
- 如果页面 Frontmatter 中的 `footer` 是一个字符串，它将被用作页脚内容。

## 版权信息

你可以通过 `copyright` 和 `license` 字段设置全局或特定页面的版权与协议信息。

- `copyright` 字段标识版权信息内容，它会通过 `v-html` 插入，因此同时支持 HTML 和纯文本。你可以在页面 Frontmatter 中将 `copyright` 设置为 `false` 隐藏此页面的版权信息。
- `license` 字段标识协议名称，我们推荐你严格遵守协议的规定进行指定。指定后，`copyright` 会拥有基于协议名称的默认版权信息（当然你仍然可以自定义 `copyright`）。

## 例子

- 显示默认的页脚文字:

  ```md
  ---
  footer: true
  ---
  ```

- 当你在主题选项中设置 `displayFooter: true` 时，你还可以局部禁用它:

  ```md
  ---
  footer: false
  ---
  ```

- 自定义页脚文字，同时不显示版权信息:

  ```md
  ---
  footer: This site is served by GitHub Pages
  copyright: false
  ---
  ```

- 自定义页脚的内容和版权信息:

  ```md
  ---
  footer: <a href="https://github.com/Mister-Hope">Mr.Hope</a>
  license: CC 4.0
  ---
  ```

- 如果你希望移除默认的 footer 内容同时显示自定义版权信息:

  ```md
  ---
  footer: ""
  copyright: 自定义版权信息
  ---
  ```

---
title: 页脚支持
icon: fas fa-window-maximize fa-rotate-180
category:
  - 布局
order: 4
tag:
  - 布局
  - 页脚
---

`vuepress-theme-hope` 为所有页面提供了页脚功能 <Badge text="支持页面配置" />。

<!-- more -->

## 全局配置

在主题选项中，`footer` 字段用于全局配置页脚。你可以在主题选项中设置 `footer` 和 `copyright` 全局设置默认的页脚内容与版权信息。

默认情况下页脚不会显示在页面中。如果希望每个页面都显示页脚，需要在主题选项中设置 `displayFooter: true`。

::: info 多语言配置支持

你可以在主题选项中通过 `locales` 为每个语言分别设置页脚。

:::

## 页面配置

你可以在页面的 frontmatter 中配置 `footer`，`copyright` 字段，指定特定页面的页脚内容。

### footer

- 当 `displayFooter: true` 时，你可以在 frontmatter 中将 `footer` 设置为 `false` 来禁用特定页面的页脚。

- 当全局显示页脚未开启时，将 `footer` 设置为 `true` 会显示默认的页脚文字。

- 如果你填入一个字符串，它会以 `v-html` 指令的形式插入到页脚的位置作为页脚的内容，所以你可以填入 HTMLString。

### copyright

`copyright` 字段用于设置特定页面的版权信息，它同样也支持 HTMLString (当你引用了文章且文章使用了特定许可的情况下很有用)。

默认的版权信息文字会从主题选项中的作者和许可信息生成。

当然在 `displayFooter: true` 时，你也可以填入 `false` 来隐藏特定页面的版权信息。

## 例子

- 显示默认的页脚文字:

  ```md
  ---
  footer: true
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
  copyrightText: MIT LICENSE
  ---
  ```

- 当你在主题选项中设置 `displayFooter: true` 时，你还可以局部禁用它:

  ```md
  ---
  footer: false
  ---
  ```

- 如果你希望移除默认的 footer 内容同时保持版权信息显示，请传入一个空字符串:

  ```md
  ---
  footer: ""
  ---
  ```

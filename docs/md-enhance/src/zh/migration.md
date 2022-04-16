---
title: 迁移指南
icon: change
---

## 移除的选项

- `lineNumbers` 被移除

  VuePress 2 现在支持每个代码块的行号配置。

- `imageFix` 被移除

  Mr.Hope 已经做了一个 PR 来修复 Markdown 中损坏的图片链接

## 新功能

- Markdown 链接检查

  该插件现在检查你的 Markdown 链接，并在检测到损坏的链接时警告你。

  你可以通过 `linkCheck` 选项控制此行为

- `v-pre` 支持

  VuePress 2 从 `@vuepress/core` 中删除了以下容器支持，因此添加了此选项

  ```md
  ::: v-pre

  一些 {{vue 语法}}。

  :::
  ```

- `chart` 支持

  V2 版本通过 `chart` 选项添加了 [chart.js](https://www.chartjs.org/docs/latest/) 支持。

  ````md
  ::: chart 标题

  ```json
  {
    // chart.js 配置
  }
  ```

  :::
  ````

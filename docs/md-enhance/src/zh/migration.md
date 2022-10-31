---
title: 迁移至 V2
icon: change
---

## 传统模式

您可以在调用 `mdEnhancePlugin` 时传递第二个参数 `true` 以启用传统模式，插件将尝试以 V1 行为运行。

## 新功能

- Markdown 链接检查

  该插件现在检查你的 Markdown 链接，并在检测到损坏的链接时警告你。

  你可以通过 `linkCheck` 选项控制此行为

- 图像标记支持

  通过 `imageMark` 选项使用 `#light` 和 `#dark` 后缀标记图像以在日间模式或夜间模式下显示它们。

- `v-pre` 支持

  VuePress 2 从 `@vuepress/core` 中删除了以下容器支持，因此添加了 `vPre` 选项

  ```md
  ::: v-pre

  一些 {{vue 语法}}。

  :::
  ```

- Chart.js 支持

  新增 `chart` 选项提供 [chart.js](https://www.chartjs.org/docs/latest/) 支持

  ````md
  ::: chart 标题

  ```json
  {
    // chart.js 配置
  }
  ```

  :::

  ::: chart 标题

  ```js
  module.exports = {
    // chart.js 配置
  };
  ```

  :::
  ````

- ECharts 支持

  新增 `echarts` 选项提供 [ECharts](https://echarts.apache.org/en/index.html) 支持。

  ````md
  ::: echarts 标题

  ```json
  {
    // echarts 配置
  }
  ```

  :::

  ::: echarts 标题

  ```js
  module.exports = {
    // echarts 配置
  };
  ```

  :::
  ````

- 包含文件支持

  新增 `include` 选项使用 `@include()` 将其他文件内容导入到 Markdown 中。

  使用 `@include(filename)` 导入文件。

  如果要部分导入文件，你可以指定导入的行数

  - `@include(filename{start-end})`
  - `@include(filename{start-})`
  - `@include(filename{-end})`

- 选项卡支持

  新增 `tabs` 选项通过 `tabs` 容器创建选项卡。

## 变更

- 重命名 `codegroup` 为 `codetabs`

- 现在所有选项均默认不开启

- 代码演示语法变更

  旧语法:

  ```md
  ::: demo Title

  <!-- demo content -->

  :::

  ::: demo [vue] Title

  <!-- demo content -->

  :::

  ::: demo [react] Title

  <!-- demo content -->

  :::
  ```

  新语法:

  ```md
  ::: normal-demo Title

  <!-- demo content -->

  :::

  ::: vue-demo Title

  <!-- demo content -->

  :::

  ::: react-demo Title

  <!-- demo content -->

  :::
  ```

- 代码组语法变更

  旧语法:

  ````md
  :::: code-group

  ::: code-group-item pnpm

  ```bash
  pnpm create vuepress-theme-hope@next [dir]
  ```

  :::

  ::: code-group-item npm:active

  ```bash
  npm init vuepress-theme-hope@next [dir]
  ```

  :::

  ::::
  ````

  新语法:

  ````md
  ::: code-tabs

  @tab pnpm

  ```bash
  pnpm create vuepress-theme-hope@next [dir]
  ```

  @tab:active npm

  ```bash
  npm init vuepress-theme-hope@next [dir]
  ```

  :::
  ````

## 移除的选项

- `enableAll` 被移除

  有太多不知道自己在做什么的菜鸟用户，他们只是启用此选项而没有使用提供的所有功能，但他们抱怨加载速度。

- `lineNumbers` 被移除

  VuePress 2 现在支持每个代码块的行号配置。

- `imageFix` 被移除

  Mr.Hope 已经做了一个 PR 来修复 Markdown 中损坏的图片链接

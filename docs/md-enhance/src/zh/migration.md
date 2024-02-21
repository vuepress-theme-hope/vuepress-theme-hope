---
title: 最新版本迁移
icon: code-compare
---

## 传统模式 <Badge text="当前默认" />

你可以在调用 `mdEnhancePlugin` 时传递第二个参数 `true` 以启用传统模式，插件将尝试以 V1 行为运行。

## 新功能

- 图像标记支持

  通过 `imgMark` 选项使用 `#light` 和 `#dark` 后缀标记图像以在日间模式或夜间模式下显示它们。

- `v-pre` 支持

  VuePress 2 删除了以下容器支持，因此添加了 `vPre` 选项

  ```md
  ::: v-pre

  一些 {{vue 语法}}。

  :::
  ```

- 新增 component 代码块以快速添加组件

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
  const config = {
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
  const option = {
    // echarts 配置
  };
  ```

  :::
  ````

- 包含文件支持

  新增 `include` 选项使用 `<!-- @include: -->` 将其他文件内容导入到 Markdown 中。

  使用 `<!-- @include: filename -->` 导入文件。

  如果要部分导入文件，你可以指定导入的行数

  - `<!-- @include: filename{start-end} -->`
  - `<!-- @include: filename{start-} -->`
  - `<!-- @include: filename{-end} -->`

  同时你也可以导入文件区域:

  - `<!-- @include: filename#region -->`

- 选项卡支持

  新增 `tabs` 选项通过 `tabs` 容器创建选项卡。

- MarkMap 支持

  新增 `markmap` 选项通过 `markmap` 容器创建 [Markmap](https://markmap.js.org/)。

- Playground

  通过官方预设和自定义选项嵌入交互演示

- Kotlin Playground

  通过 `kotlin-playground` 提供 Kotlin 交互演示

- Vue Playground

  通过 `@vue/repl` 提供 Vue 交互演示

- Mathjax 支持

  通过 `mathjax` 选项提供 [Mathjax](https://www.mathjax.org/) 支持

- GFM 警告

  通过 `alert` 选项新增 GFM 警告支持

## 变更

- 现在所有选项均默认不开启

- 重命名 `container` 为 `hint`

  为了对齐 GFM， danger 容器重命名为 caution， 同时新增 important 和 note 容器

- 重命名 `codegroup` 为 `codetabs`

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
  pnpm create vuepress-theme-hope [dir]
  ```

  :::

  ::: code-group-item npm:active

  ```bash
  npm init vuepress-theme-hope@latest [dir]
  ```

  :::

  ::::
  ````

  新语法:

  ````md
  ::: code-tabs

  @tab pnpm

  ```bash
  pnpm create vuepress-theme-hope [dir]
  ```

  @tab:active npm

  ```bash
  npm init vuepress-theme-hope@latest [dir]
  ```

  :::
  ````

- `presentation` 被重构为 `reveal.js`

  支持主题的 Tree-shaking，并通过[客户端配置文件][client-config]自定义 Reveal.js

## 移除的选项

- `enableAll` 被移除

  有太多不知道自己在做什么的菜鸟用户，他们只是启用此选项而没有使用提供的所有功能，但他们抱怨加载速度。

- `lineNumbers` 被移除

  VuePress 2 现在支持每个代码块的行号配置。

- `imageFix` 被移除

  Mr.Hope 已经做了一个 PR 来修复 Markdown 中损坏的图片链接

## 预发布版本中的选项调整

- `container` 被重命名为 `hint`

- `lazyload` 和 `imageLazyload` 被重命名为 `imgLazyload`

- `imageMark` 被重命名为 `imgMark`

- `mdImport` 被重命名为 `include`

- `tex` (使用 katex) 被重命名为 `katex`

- `vpre` 选项被重命名为 `vPre`

- `imageTitle` 被重命名为 `figure`

- `revealjs` 被重命名为 `revealJS`

- `card` 由 `components` 替代

- `mermaid` `revealJs` `vuePlayground` 等选项不再接受相关库的配置

[client-config]: https://vuejs.press/zh/guide/configuration.html#%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6

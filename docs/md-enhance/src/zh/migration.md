---
title: 最新版本迁移
icon: code-compare
---

## 传统模式 <Badge text="当前默认" />

你可以在调用 `mdEnhancePlugin` 时传递第二个参数 `true` 以启用传统模式，插件将尝试以 V1 行为运行。

## 新功能

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
  ::: chartjs 标题

  ```json
  {
    // chart.js 配置
  }
  ```

  :::

  ::: chartjs 标题

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

- MarkMap 支持

  新增 `markmap` 选项通过 `markmap` 容器创建 [Markmap](https://markmap.js.org/)。

- Playground

  通过官方预设和自定义选项嵌入交互演示

- Kotlin Playground

  通过 `kotlin-playground` 提供 Kotlin 交互演示

- Vue Playground

  通过 `@vue/repl` 提供 Vue 交互演示

## 变更

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

## 移除的选项

- `enableAll` 被移除

  有太多不知道自己在做什么的菜鸟用户，他们只是启用此选项而没有使用提供的所有功能，但他们抱怨加载速度。

- `lineNumbers` 被移除

  VuePress 2 现在支持每个代码块的行号配置。

- `imageFix` 被移除

  Mr.Hope 已经做了一个 PR 来修复 Markdown 中损坏的图片链接

- `alert` 被移除

  请用 `@vuepress/plugin-markdown-hint` 代替

- `container`, `hint` 被移除

  请用 `@vuepress/plugin-markdown-hint` 代替

- `imageLazyload`, `lazyload` `imgLazyload` 被移除

  请用 `@vuepress/plugin-markdown-image` 代替

- `imageTitle`, `figure` 被移除

  请用 `@vuepress/plugin-markdown-image` 代替

- `imageMark`, `imgMark` 被移除

  请用 `@vuepress/plugin-markdown-image` 代替

- `imgSize`, `imageSize` 被移除

  请用 `@vuepress/plugin-markdown-image` 代替

- `tex`, `katex`, `mathjax` 被移除

  请用 `@vuepress/plugin-markdown-math` 代替

- `codegroup`, `codetabs` 被移除

  请用 `@vuepress/plugin-markdown-tab` 代替

- `tabs` 被移除

  请用 `@vuepress/plugin-markdown-tab` 代替

- `presentation` `revealJs` `revealjs` 被移除

  请用 `@vuepress/plugin-revealjs` 代替

## 预发布版本中的选项调整

- `mdImport` 被重命名为 `include`

- `vpre` 选项被重命名为 `vPre`

- `card` 由 `components` 替代

- `mermaid` `vuePlayground` 等选项不再接受相关库的配置

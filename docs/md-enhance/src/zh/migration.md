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

- `chartjs` `echarts` `flowchart` `markmap` `mermaid` `plantuml` 被移除

  请用 `@vuepress/plugin-markdown-chart` 代替

## 预发布版本中的选项调整

- `vpre` 选项被重命名为 `vPre`

- `card` 由 `components` 替代

- `vuePlayground` 等选项不再接受相关库的配置

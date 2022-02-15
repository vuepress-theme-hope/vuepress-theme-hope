---
title: VuePress
icon: vue
category:
  - basic
tag:
  - vuepress
prev: ../markdown/demo
---

VuePress 是一个以 Markdown 为中心的静态网站生成器。你可以使用 [Markdown](https://zh.wikipedia.org/wiki/Markdown) 来书写内容（如文档、博客等），然后 VuePress 会帮助你生成一个静态网站来展示它们。

<!-- more -->

## 像数 1, 2, 3 一样容易

```shell
# 在 docs 文件夹创建 vuepress 项目
npm init vuepress-theme-hope docs
```

## 它是如何工作的？

一个 VuePress 站点本质上是一个由 [Vue](https://v3.vuejs.org/) 和 [Vue Router](https://next.router.vuejs.org) 驱动的单页面应用 (SPA)。

路由会根据你的 Markdown 文件的相对路径来自动生成。每个 Markdown 文件都通过 [markdown-it](https://github.com/markdown-it/markdown-it) 编译为 HTML ，然后将其作为 Vue 组件的模板。因此，你可以在 Markdown 文件中直接使用 Vue 语法，便于你嵌入一些动态内容。

在开发过程中，我们启动一个常规的开发服务器 (dev-server) ，并将 VuePress 站点作为一个常规的 SPA。如果你以前使用过 Vue 的话，你在使用时会感受到非常熟悉的开发体验。

在构建过程中，我们会为 VuePress 站点创建一个服务端渲染 (SSR) 的版本，然后通过虚拟访问每一条路径来渲染对应的 HTML 。这种做法的灵感来源于 [Nuxt](https://nuxtjs.org/) 的 `nuxt generate` 命令，以及其他的一些项目，比如 [Gatsby](https://www.gatsbyjs.org/)。

## VuePress 介绍

- [页面](page.md)

- [Markdown](markdown.md)

- [文件结构简介](file.md)

- [配置](config.md)

- [插件](plugin.md)

- [主题](theme.md)

## VuePress 官方文档

- [VuePress](https://v2.vuepress.vuejs.org/zh/)

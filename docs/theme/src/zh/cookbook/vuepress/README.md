---
title: VuePress
icon: fab fa-vuejs
dir:
  collapsible: false
  order: 2
category:
  - 教程知识
  - VuePress
tag:
  - 介绍
  - VuePress
prev: ../markdown/demo.html
---

VuePress 是一个以 Markdown 为中心的静态网站生成器。你可以使用 [Markdown](https://zh.wikipedia.org/wiki/Markdown) 来书写内容 (如文档、博客等) ，然后 VuePress 会帮助你生成一个静态网站来展示它们。

<!-- more -->

## VuePress 工作原理

一个 VuePress 站点本质上是一个由 [Vue](https://v3.vuejs.org/) 和 [Vue Router](https://next.router.vuejs.org) 驱动的单页面应用 (SPA)。

路由会根据你的 Markdown 文件的相对路径来自动生成。每个 Markdown 文件都通过 [markdown-it](https://github.com/markdown-it/markdown-it) 编译为 HTML ，然后将其作为 Vue 组件的模板。因此，你可以在 Markdown 文件中直接使用 Vue 语法，便于你嵌入一些动态内容。

- 在开发过程中，我们启动一个常规的开发服务器 (dev-server) ，并将 VuePress 站点作为一个常规的 SPA。

- 在构建过程中，我们会为 VuePress 站点创建一个服务端渲染 (SSR) 的版本，然后通过虚拟访问每一条路径来渲染对应的 HTML。

## VuePress 介绍

- [页面](page.md)

- [Markdown](markdown.md)

- [文件结构简介](file.md)

- [配置](config.md)

- [插件](plugin.md)

- [主题](theme.md)

## VuePress 官方文档

- [VuePress](https://vuejs.press/zh/)

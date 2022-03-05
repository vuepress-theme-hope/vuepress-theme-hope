---
title: 小白教程
icon: creative
category:
  - 快速上手
  - 基础知识
  - 教程
---

本教程是一个针对小白手把手教程。

<!-- more -->

## 环境安装

你需要安装最新的 Node.js 长期支持版。

下载地址:

- Node.js 长期支持版: [下载地址](https://nodejs.org/zh-cn/)

  ::: note

  请在打开的页面中，点击左侧的绿色按钮，即可完成下载。

  :::

  在安装过程中，保持所有的默认设置，一路下一步即可。

  ::: warning

  如果你真的是个小白，请不要改默认安装目录，以免你在出现问题时找不到对应的文件夹。

  Node.js 本身只会占据几十 M 的空间!

  :::

## 创建模板

在一个合适的位置创建一个文件夹，并在该文件夹下打开终端。

::: note Windows 下对应操作

请使用文件管理器打开对应文件夹，之后在上方的地址栏中输入 `cmd` 之后按下回车。

:::

在终端中执行:

```sh
npm create vuepress-theme-hope@next docs
```

稍等片刻，你就可以在浏览器地址栏输入 `localhost:8080/zh/` 访问开发服务器了。

::: tip

启动开发服务器，请在终端输入 `npm run docs:dev` 并回车。

如果你需要终止开发服务器，请点击终端，并连续两次按下 `Ctrl + C`。

:::

## 添加或修改页面

`docs` 文件夹下除 `.vuepress` 文件夹之外的文件都会渲染为网页，渲染后的链接与文件夹结构和文件名称一一对应。只有 `README.md` 是特例，它会显示为文件夹下的默认网页 (默认主页)。这应该很好理解。

比如你想要创建一个 `/a/b/`，你可以创建 `docs/a/b/README.md`；想要创建一个 `/x/y.html`，你可以创建 `docs/x/y.md`。

Markdown 的内容会渲染为网页的内容。关于 Markdown 教程，请见 [Markdown 教程](markdown/README.md)。大概十五分钟，你就可以学会 Markdown 的内容，看完之后记得回来！

学会 Markdown 之后你就可以尝试自己编辑 Markdown 文件来修改模板的内容。

## 配置 VuePress

接下来请阅读本文档 [VuePress 基础](vuepress/README.md)，大致了解 VuePress 是什么和如何使用它。

如果你觉得已经掌握，接下来就是阅读 [VuePress 官方文档](https://v2.vuepress.vuejs.org/zh/guide/) 和本主题文档，根据你想要的对本主题进行配置。

::: warning

请务必先阅读官方文档再阅读本主题文档。

本主题文档并没有针对官方文档已有的内容做过多的重复介绍，所以如果你不阅读官方文档，你可能无法掌握某些配置，比如模板中使用的多语言。

:::

## 构建网站

在你初步配置好项目之后，你就可以使用 `npm run docs:build` 命令将网站构建输出到 dist 文件夹下。

你可以将文件夹的内容部署到你网站的服务器上。最简单的做法是上传到 GitHub 并开启 GitHub Pages。

关于 GitHub 的相关教程，你可以参考 [GitHub 简介](https://mrhope.site/code/github/)。

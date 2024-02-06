---
title: 运行环境设置
icon: leaf
order: 1
category:
  - 快速上手
  - 基础知识
  - 教程
tag:
  - 运行环境
---

本教程将指导你如何搭建 VuePress 的运行环境。

<!-- more -->

## 编辑器

一个趁手的编辑器是必要的，我们推荐你使用 VSCode 来编写和运行你的 VuePress 项目。

1. 在 [下载页面](https://code.visualstudio.com/) 中点击左侧的蓝色按钮完成下载。

1. 双击安装包打开

1. 同意用户协议。

1. 安装选项中，请务必 **全选** 以下选项:

   ![安装 VS Code](./assets/vscode-install.png)

   勾选 **添加到目录上下文菜单**、**添加到文件上下文菜单**、**将 code 注册为受支持的文件编辑器**、**添加到 path**。

1. 在 VS Code 初次启动后，若未提前安装 Git 可能会提示未找到 Git 软件，忽略即可。

1. 推荐立即执行简体中文扩展安装以保证界面语言为简体中文。

   ::: tip

   当你安装 VS Code 并第一次打开的时候，VS Code 会自动检测当前系统语言并在右下角推荐你安装对应语言的扩展，点击按钮即可自动安装。

   :::

## Node.js

::: info 介绍

[Node.js®](https://nodejs.org/zh-cn/) 是一个基于 [Chrome V8 引擎](https://v8.dev/) 的 JavaScript 运行时环境。

:::

你需要下载并安装最新的长期维护版。

1. 点击 [下载地址](https://nodejs.org/en) 左侧的绿色按钮 (LTS)。
1. 运行安装包，保持所有的默认设置，一路下一步即可。

::: warning

如果你真的是个小白，请不要改默认安装目录，以免你在出现问题时找不到对应的文件夹。

Node.js 本身只会占据几十 M 的空间!

:::

## pnpm

在你安装 Node.js 之后，在终端中输入下列命令启用 corepack:

```bash
corepack enable
```

::: tip

我们推荐你使用 pnpm 作为项目管理器，因为 VuePress 和 VuePress Theme Hope 都是通过 pnpm 来管理依赖的。

pnpm 的一些功能可以保证你拥有正确的依赖，并且它能加速安装。

:::

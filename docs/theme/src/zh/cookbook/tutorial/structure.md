---
title: 项目结构
icon: tree
category:
  - 快速上手
  - 基础知识
  - 教程
tag:
  - 配置项目
---

本教程将介绍 VuePress 项目结构。

<!-- more -->

## VuePress 项目结构

VuePress 只控制 VuePress 项目文件夹中的文件，也就是上一章中的参数，你所使用文件夹的其他文件不受 VuePress 控制。

::: note

如果你按照之前教程的指引使用 `docs`，那么 `docs` 就是你的 VuePress 项目文件夹。

:::

一个基本的项目结构如下:

```
.
├── .github (可选的) → GitHub 配置文件存放路径
│    └── workflow → GitHub 工作流配置
│         └── docs-deploy.yml → 自动部署文档的工作流
|
├── docs → 由你指定的项目文件夹
│    │
│    ├── .vuepress (可选的) → VuePress 配置文件夹
│    │    │
│    │    ├── dist (默认的) → 构建输出目录
│    │    │
│    │    ├── public (可选的) → 静态资源目录
│    │    │
│    │    ├── styles (可选的) → 用于存放样式相关的文件
│    │    │
│    │    ├── config.{js,ts} (可选的) → 配置文件的入口文件
│    │    │
│    │    └── client.{js,ts} (可选的) → 客户端文件
│    │
│    ├── ... → 其他项目文档
│    │
│    └── README.md → 项目主页
│
└── package.json → Nodejs 配置文件
```

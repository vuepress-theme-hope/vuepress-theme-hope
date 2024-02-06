---
title: 项目结构
icon: folder-tree
order: 6
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

VuePress 只控制 VuePress 项目文件夹中的文件，也就是默认模板生成的 `src` 文件夹，项目下的其他文件不受 VuePress 控制。

一个基本的项目结构如下:

```
.
├── .github (可选的) → GitHub 配置文件存放路径
│    └── workflow → GitHub 工作流配置
│         └── docs-deploy.yml → 自动部署文档的工作流
│
├── src → 文档文件夹
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

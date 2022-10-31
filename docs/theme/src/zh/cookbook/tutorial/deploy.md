---
title: 部署项目
icon: launch
category:
  - 快速上手
  - 基础知识
  - 教程
tag:
  - 部署项目
---

本教程指引你如何部署 VuePress 项目。

<!-- more -->

## 构建项目

当你在本地完成项目的初步开发后，你就可以使用 `pnpm docs:build` 命令构建网站。

如果你在使用模板，网站内容将会输出到 VuePress 项目的 `.vuepress/dist` 文件夹下。这些文件就是 VuePress 的最终输出结果。

你可以将此文件夹的内容部署到你网站的服务器上。最简单的做法是上传到 GitHub 并开启 GitHub Pages。

## 部署到 GitHub Pages

如果你在使用模板，且在创建过程中选择了创建自动部署文档的 GitHub 工作流，那么你唯一要做的就是设置正确的 [base 选项](https://v2.vuepress.vuejs.org/zh/reference/config.html#base)。

- 如果你准备发布到 `https://<USERNAME>.github.io/`，你必须将整个项目上传至 `https://github.com/<USERNAME>/<USERNAME>.github.io` 仓库。在这种情况下你无需进行任何更改，因为 base 默认就是 `"/"`。

- 如果你的仓库地址是一个普通的形如 `https://github.com/<USERNAME>/<REPO>` 的格式，网站将会被发布到 `https://<USERNAME>.github.io/<REPO>/` ，也就是说，你需要将 base 设置为 `"/<REPO>/"`。

::: tip Github 教程

关于 GitHub 的相关教程，你可以参考 [GitHub 简介](https://mrhope.site/code/github/)。

:::

## 其他部署方式

关于其他部署方式，请参阅 [VuePress → 部署](https://v2.vuepress.vuejs.org/zh/guide/deployment.html)。

::: tip Gitee

如果你在使用码云，你需要注意码云的特殊仓库是 `https://gitee.com/<USERNAME>/<USERNAME>`。如果你推送到这个仓库，你的文档将会发布在 `https://<USERNAME>.gitee.io` 上。

:::

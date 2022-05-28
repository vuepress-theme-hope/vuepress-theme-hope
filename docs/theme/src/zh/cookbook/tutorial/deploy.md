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

::: details GitHub 工作流

如果你在创建模板时没有选择创建工作流，你可以现在手动创建它:

1. 在项目根文件夹下创建 `.github` 文件夹
1. 在 `.github` 文件夹下创建 `workflows` 文件夹
1. 在 `workflows` 文件夹下创建 `deploy-docs.yml`
1. 将下方内容粘贴至 `deploy-docs.yml` 并保存。

```yml
name: 部署文档

on:
  push:
    branches:
      # 确保这是你正在使用的分支名称
      - main

jobs:
  deploy-gh-pages:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 0
          # 如果你文档需要 Git 子模块，取消注释下一行
          # submodules: true

      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 7
          run_install: true

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 16
          cache: pnpm

      - name: Build Docs
        env:
          NODE_OPTIONS: --max_old_space_size=8192
        run: pnpm docs:build

      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          # 这是文档部署到的分支名称
          branch: gh-pages
          folder: docs/.vuepress/dist
```

:::

::: tip Github 教程

关于 GitHub 的相关教程，你可以参考 [GitHub 简介](https://mrhope.site/code/github/)。

:::

## 其他部署方式

关于其他部署方式，请参阅 [VuePress → 部署](https://v2.vuepress.vuejs.org/zh/guide/deployment.html)。

::: tip Gitee

如果你在使用码云，你需要注意码云的特殊仓库是 `https://gitee.com/<USERNAME>/<USERNAME>`。如果你推送到这个仓库，你的文档将会发布在 `https://<USERNAME>.gitee.io` 上。

:::

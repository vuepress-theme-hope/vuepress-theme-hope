---
title: Giscus
icon: github
---

Giscus 是一个基于 GitHub Discussion 的评论系统，启用简便。

<!-- more -->

## 准备工作

1. 你需要创建一个公开仓库，并开启评论区，以作为评论存放的地点
1. 你需要安装 [Giscus App](https://github.com/apps/giscus)，使其有权限访问对应仓库。

在完成以上步骤后，请前往 [Giscus 页面](https://giscus.app/zh-CN) 获得你的设置。你只需要填写仓库和 Discussion 分类，之后滚动到页面下部的 “启用 giscus” 部分，复制 `data-repo`, `data-repo-id`, `data-category` 和 `data-category-id` 四项，因为它们是必须的。

## 配置

请将 `data-repo`, `data-repo-id`, `data-category` 和 `data-category-id` 作为插件选项传入 `repo`, `repoId`, `category` `categoryId`。

::: info 夜间模式

为了能使 Giscus 使用正确的主题，你需要为 `<CommentService />` 通过 `darkmode` 属性传入一个布尔值，代表当前是否开启夜间模式。

:::

其他的配置项详见 [Giscus 配置](../config/giscus.md)。

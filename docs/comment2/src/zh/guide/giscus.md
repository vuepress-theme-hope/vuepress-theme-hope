---
title: Giscus
icon: fab fa-github
---

Giscus 是一个基于 GitHub Discussion 的评论系统，启用简便。

<!-- more -->

## 准备工作

1. 你需要创建一个公开仓库，并开启评论区，以作为评论存放的地点
1. 你需要安装 [Giscus App](https://github.com/apps/giscus)，使其有权限访问对应仓库。
1. 在完成以上步骤后，请前往 [Giscus 页面](https://giscus.app/zh-CN) 获得你的设置。

   你只需要填写仓库和 Discussion 分类，之后滚动到页面下部的 “启用 giscus” 部分，获取 `data-repo`, `data-repo-id`, `data-category` 和 `data-category-id` 这四个属性。

## 配置

请配置 `provider: "Giscus"` 并将 `data-repo`, `data-repo-id`, `data-category` 和 `data-category-id` 作为插件选项传入 `repo`, `repoId`, `category` `categoryId`。

其他的配置项详见 [Giscus 配置](../config/giscus.md)。

## 主题

默认情况下，Giscus 使用 `light` 或 `dark` 主题 (基于夜间模式状态)。

::: info 夜间模式

为了能使 Giscus 应用正确的主题，你需要为 `<CommentService />` 通过 `darkmode` 属性传入一个布尔值，代表当前是否开启夜间模式。

:::

如果你想在日间模式和夜间模式下自定义主题，你可以设置 `lightTheme` 和 `darkTheme` 选项，使用内置主题关键字或以 `https://` 开头的自定义 css 链接。

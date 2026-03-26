---
title: 项目内容
icon: file
order: 4
category:
  - 快速上手
  - 基础知识
  - 教程
tag:
  - 项目内容
---

本文档介绍 VuePress 项目中的页面生成、Markdown 处理与 Frontmatter 配置。

<!-- more -->

## 页面生成

VuePress 基于 Markdown 文件生成独立页面。路由路径由文件的相对路径决定。

当你通过脚手架生成项目时，你将看到以下目录结构：

```text
└─ src
   ├─ demo
   │  ├─ ...
   │  ├─ page.md
   │  ├─ markdown.md
   │  └─ README.md
   ├─ ...
   └─ README.md
```

路由路径解析规则：

| 相对路径          | 路由路径          |
| ----------------- | ----------------- |
| `/README.md`      | `/`               |
| `/demo/README.md` | `/demo/`          |
| `/demo/page.md`   | `/demo/page.html` |

::: note
`README.md` 会被解析为 `index.html`，作为所在目录的默认索引页。
:::

## Markdown 处理

VuePress Theme Hope 会将 Markdown 文件渲染为 HTML 内容。你可以编辑 Markdown 文件以修改内容，在开发服务器运行期间，这些更改会实时同步。

::: tip
参考 [Markdown 教程](../cookbook/markdown/README.md) 了解基础语法。
:::

::: info
环境内可用的语法扩展：

- VuePress 基础扩展：[VuePress → Markdown](../cookbook/vuepress/markdown.md)。
- 主题插件扩展：[指南 → Markdown](../guide/intro/markdown.md)。

:::

## Frontmatter 配置

Frontmatter 用于分配页面级配置。它采用 YAML 格式，必须置于 Markdown 文件顶部，并由三横线（`---`）包裹。

```md
---
lang: zh-CN
title: 页面的标题
description: 页面的描述
---

<!-- 这里是 Markdown 内容 -->

...
```

Frontmatter 属性（如 `lang`、`title`、`description`）会覆盖 [VuePress 配置文件](../cookbook/vuepress/config.md#配置文件) 中的全局设置。此配置仅在当前页面生效，且具有最高优先级。

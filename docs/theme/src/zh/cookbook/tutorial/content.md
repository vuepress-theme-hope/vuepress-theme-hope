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

本教程指引你如何在 VuePress 项目中控制内容生成。

<!-- more -->

## 页面的生成

VuePress 是以 Markdown 为中心的。你项目中的每一个 Markdown 文件都是一个单独的页面。

默认情况下，页面的路由路径是根据你的 Markdown 文件的相对路径决定的。

由于你的项目是通过创建助手生成的，那么你会得到以下文件结构:

```
└─ src
   ├─ guide
   │  ├─ ...
   │  └─ page.md
   │  └─ markdown.md
   │  └─ README.md
   ├─ ...
   ├─ slide.md
   └─ README.md
```

你的 Markdown 文件对应的路由路径为:

| 相对路径           | 路由路径            |
| ------------------ | ------------------- |
| `/README.md`       | `/`                 |
| `/slide.md`        | `/slide.html`       |
| `/guide/README.md` | `/guide/`           |
| `/guide/slide.md`  | `/guide/slide.html` |
| `/guide/page.md`   | `/guide/page.html`  |

::: tip README.md

`README.md` 是特例，在 Markdown 中，按照约定俗成，它会作为所在文件夹的主页。所以在渲染为网页时，它的对应路径为网页中的主页路径 `index.html`。

这应该很好理解。

:::

## Frontmatter

Frontmatter 是 VuePress 中很重要的一个概念，它用于承载 Markdown 文件的配置。Markdown 文件可以包含一个 [YAML](https://yaml.org/) Frontmatter。

::: info YAML

如果你对 YAML 也不熟悉，你可以查看 [YAML 教程](https://mrhope.site/code/language/yaml/)。

:::

Frontmatter 必须在 Markdown 文件的顶部，并且被包裹在一对三短划线中间。下面是一个基本的示例:

```md
---
lang: zh-CN
title: 页面的标题
description: 页面的描述
---

<!-- 这里是 Markdown 内容 -->

...
```

你肯定注意到 Frontmatter 中的字段和 VuePress 配置文件十分类似。你可以通过 Frontmatter 来覆盖当前页面的 `lang`, `title`, `description` 等属性。因此，你可以把 Frontmatter 当作页面级作用域的配置，它通常具有最高优先级，所作配置仅对当前页面生效。

## Markdown

每一个 Markdown 文件都会被 VuePress Theme Hope 处理，将文件内容渲染为网页内容。

::: tip Markdown 语法

如果你尚不了解 Markdown，请查看 [Markdown 教程](../markdown/README.md)。

大概十五分钟，你就可以学会如何书写 Markdown，看完之后记得回来！

:::

你可以尝试自己编辑 Markdown 文件来修改模板的内容。如果你已启动开发服务器，那么修改后的结果会被实时同步到开发服务器上。

::: info Markdown 语法扩展

- VuePress 自身对 Markdown 语法进行了一些扩展，关于这些扩展的语法，详见 [VuePress → Markdown](../vuepress/markdown.md)。

- 主题通过 `vuepress-plugin-md-enhance` 额外启用了一些语法扩展，详见 [指南 → Markdown](../../guide/get-started/markdown.md)。

:::

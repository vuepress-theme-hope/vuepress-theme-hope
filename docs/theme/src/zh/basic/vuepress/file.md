---
title: 文件结构介绍
icon: folder
category: basic
tags:
  - vuepress
---

## 文件结构

```md
.
├── dist → 构建输出目录
│
├── src
│ ├── .vuepress (可选的) → 用于存放全局的配置、组件、静态资源等
│ │ ├── components (可选的) → 该目录中的 Vue 组件将会被自动注册为全局组件
│ │ │
│ │ ├── theme (可选的) → 用于存放本地主题
│ │ │ │
│ │ │ ├── ... → 在主题部分查看更多详情
│ │ │ │
│ │ │ └── Layout.vue → 布局
│ │ │
│ │ ├── public (可选的) → 静态资源目录
│ │ │
│ │ ├── styles (可选的) → 用于存放样式相关的文件
│ │ │ ├── index.styl → 将会被自动应用的全局样式文件，会生成在最终的 CSS 文件结尾，具有比默认样式更高的优先级。
│ │ │ └── palette.styl → 用于重写默认颜色常量，或者设置新的 stylus 颜色常量
│ │ │
│ │ ├── templates (可选的, 谨慎配置) → 存储 HTML 模板文件
│ │ │ ├── dev.html → 用于开发环境的 HTML 模板文件
│ │ │ └── ssr.html → 构建时基于 Vue SSR 的 HTML 模板文件
│ │ │
│ │ ├── config.js (可选的) → 配置文件的入口文件
│ │ │
│ │ └── enhanceApp.js (可选的) → 客户端应用的增强
│ │
│ ├── readme.md → 主页
│ ├── vuepress
│ │ ├── ...
│ │ └── readme.md
│ ├── markdown
│ │ ├── ...
│ │ └── readme.md
│ │
│ └── en → English Folder → 英文语言文件夹
│ ├── readme.md → 主页
│ │
│ ├── vuepress
│ │ ├── ...
│ │ └── readme.md
│ │
│ └── markdown
│ ├── ...
│ └── readme.md
│
├─── readme.md → 项目中文说明
├─── readme.en-US.md → 项目英文说明
│
├── LICENSE → 许可证文件
│
├── package-lock.json → 项目实际使用的 package 结构
└── package.json → Nodejs 配置文件，也是项目的声明文件
```

::: warning

请注意 VuePress 对目录大小写敏感。

:::

## src 文件夹

**源代码**被放置在`src`目录下，在该目录下，所有的**Markdown**文件都会被渲染成**HTML**，其中`readme.md`会被渲染成`index.html`。 另外 VuePress 的配置文件全部放置在`src/.vuepress`目录下。

## dist 文件夹

构建后的代码会被**输出**到`dist`目录，只需将其上传到需要部署的服务器上即可。

如使用了自动化构建工具，开启自动部署后**无需**在本地执行构建。

## package.json

Node.js 对整个项目的声明文件，它是 Node.js 项目必包含的文件。包含了**项目名称**、**详情**、**许可证**以及使用的**package**等信息。

## readme.md

项目在 GitHub 的说明文件。

## 其他

初期无需掌握用途的文件:
| 文件 | 内容 |
| ------------------------------ | ----------------------------- |
| node_modules | 存放了项目使用的 node package |
| LICENSE | 项目许可证文件 |
| yarn.lock 或 package-lock.json | 项目依赖安装版本文件 |

## .vuepress

`.vuepress` 文件夹应直接放置在源代码的目录里。里面包含了 VuePress 的配置选项。

### config.js

项目的配置文件。具体的配置说明请打开该文件查看注释。

::: tip

更多详情可以查看[VuePress 配置](https://v1.vuepress.vuejs.org/zh/config/)

:::

### public 文件夹

放置网站的其他文件，在构建时该文件夹内的文件会**直接拷贝**至构建后的目录中。其内部资源通常是不需要使用相对路径引入的资源，比如网站的图标等。

### style 文件夹

放置了整个站点的样式，其中`index.styl`是整个站点额外扩充的样式文件，`palette.styl`是整个站点的配色配置。

::: tip

Stylus 是 CSS 的一个超集，扩充并改变了 CSS 的写法，在内部可以使用变量。初学者无需掌握。

:::

初期无需掌握用途的文件:

| 文件夹     | 内容                              |
| ---------- | --------------------------------- |
| components | 放置了 VuePress 站点中的 Vue 组件 |
| theme      | 放置了 VuePress 站点的主题        |
| templates  | 放置了 VuePress 站点的模板与布局  |

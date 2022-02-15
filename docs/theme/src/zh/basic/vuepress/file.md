---
title: 文件结构介绍
icon: folder
category:
  - basic
tag:
  - vuepress
---

## 文件结构

```md
.
├── src → 由你指定的文档文件夹
│ │
│ ├── .vuepress (可选的) → 用于存放全局的配置、组件、静态资源等
│ │ │
│ │ ├── dist (默认的) → 构建输出目录
│ │ │
│ │ ├── public (可选的) → 静态资源目录
│ │ │
│ │ ├── styles (可选的) → 用于存放样式相关的文件
│ │ │
│ │ ├── config.{js,ts} (可选的) → 配置文件的入口文件
│ │ │
│ │ └── clientAppEnhance.{js,ts} (可选的) → 客户端应用的增强
│ │
│ ├── ...
│ │
│ └── README.md
│
└── package.json → Nodejs 配置文件
```

::: warning

请注意 VuePress 对目录大小写敏感。

:::

---
title: 文件结构介绍
icon: folder
order: 3
category:
  - 教程
  - VuePress
tag:
  - 文件结构
  - VuePress
---

## 文件结构

```
.
├── docs → 由你指定的文档文件夹
│    │
│    ├── .vuepress (可选的) → 用于存放全局的配置、组件、静态资源等
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

::: warning

请注意 VuePress 对目录大小写敏感。

:::

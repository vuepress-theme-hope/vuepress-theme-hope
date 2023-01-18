---
title: Структура проекта
icon: folder-tree
order: 6
category:
  - Учебник с примерами
  - Руководство
  - Начало работы
tag:
  - Структура проекта
---

В этом руководстве будет представлена структура проекта VuePress.

<!-- more -->

## Структура проекта VuePress

VuePress управляет только файлами в папке проекта VuePress, то есть параметрами из предыдущей главы. Другие файлы в проекте не используются VuePress.

::: note

Если вы использовали `docs`, как указано в предыдущем уроке, `docs` — это папка вашего проекта VuePress.

:::

Базовая структура проекта выглядит следующим образом:

```
.
├── .github (optional) → GitHub config file storage path
│     └── workflow → GitHub workflow configuration
│          └── docs-deploy.yml → Workflow for automatic deployment of documents
|
├── docs → project folder specified by you
│    │
│    ├── .vuepress (optional) → VuePress config folder
│    │    │
│    │    ├── dist (default) → build output directory
│    │    │
│    │    ├── public (optional) → static resource directory
│    │    │
│    │    ├── styles (optional) → style-related files
│    │    │
│    │    ├── config.{js,ts} (optional) → the entry file of the configuration file
│    │    │
│    │    └── client.{js,ts} (optional) → client application file
│    │
│    ├── ... → Other project documentation
│    │
│    └── README.md → Project Homepage
│
└── package.json → Nodejs configuration file
```

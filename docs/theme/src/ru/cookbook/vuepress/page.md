---
title: Страница VuePress
icon: file
category:
  - Учебник с примерами
  - VuePress
tag:
  - Страница
  - VuePress
---

VuePress ориентирован на уценку. Каждый файл Markdown внутри вашего проекта представляет собой отдельную страницу.

## Роутинг

По умолчанию путь маршрута страницы определяется относительным путем вашего файла Markdown.

Предполагая, что это структура каталогов ваших файлов Markdown:

```
└─ docs
   ├─ guide
   │  ├─ getting-started.md
   │  └─ README.md
   ├─ contributing.md
   └─ README.md
```

Возьмите каталог `docs` в качестве [исходного каталога](https://v2.vuepress.vuejs.org/reference/cli.html), например вы используете команду `vuepress dev docs`. Тогда пути маршрута ваших файлов Markdown будут такими:

| Относительный путь | Путь маршрута        |
| ------------------ | -------------------- |
| `/README.md`       | `/`                  |
| `/contributing.md` | `/contributing.html` |
| `/guide/README.md` | `/guide/`            |
| `/guide/page.md`   | `/guide/page.html`   |

## Frontmatter

Файл Markdown может содержать frontmatter [YAML](https://yaml.org/). Вступительная часть должна быть в верхней части файла Markdown и должна быть заключена в пару строк с тройным пунктиром. Вот простой пример:

```md
---
lang: en-US
title: Title of this page
description: Description of this page
---
```

Вы, должно быть, заметили, что эти поля аналогичны параметрам конфигурации сайта в файле конфигурации. Вы можете переопределить `lang`, `title`, `description`, и т. д. текущей страницы через frontmatter. Таким образом, вы можете использовать frontmatter в качестве конфигурации области страницы.

Кроме того, VuePress имеет встроенную поддержку некоторых полей frontmatter, и у вашей темы тоже может быть своя особая frontmatter.

::: tip

Ознакомьтесь со [Справочником Frontmatter](https://v2.vuepress.vuejs.org/reference/frontmatter.html) для получения полного списка встроенных интерфейсов VuePress.

Ознакомьтесь с [Конфиг > Frontmatter](../../config/frontmatter/README.md), чтобы узнать о теме по `vuepress-theme-hope`.

:::

## Контент

Основной контент вашей страницы написан в Markdown. VuePress сначала преобразует ваш Markdown в HTML-код, а затем обрабатывает HTML-код как `<template>` Vue SFC.

Благодаря возможностям [markdown-it](https://github.com/markdown-it/markdown-it) и синтаксису шаблонов Vue базовый Markdown можно значительно расширить. Затем ознакомьтесь с руководством [Markdown](./markdown.md) для всех расширений Markdown в VuePress.

---
title: Внешний импорт
icon: link
order: -1
category:
  - Markdown
tag:
  - Markdown
---

Чтобы использовать новый синтаксис внутри Markdown для улучшения содержимого, вы также можете использовать `<iframe>` или `<img>` для импорта внешних ссылок для улучшения вашего содержимого Markdown.

<!-- more -->

## shields.io

Вы можете использовать [shields.io](https://shields.io/) для создания множества динамических значков, таких как звезды проекта, номер версии npm, загрузки и т. д.

Ввод:

```md
![Version](https://img.shields.io/npm/v/vuepress-theme-hope/next.svg?style=flat-square&logo=npm)
![Downloads](https://img.shields.io/npm/dm/vuepress-theme-hope.svg?style=flat-square&logo=npm)
![Size](https://img.shields.io/bundlephobia/min/vuepress-theme-hope?style=flat-square&logo=npm)
![Dependencies](https://img.shields.io/librariesio/release/npm/vuepress-theme-hope?style=flat-square)
```

Вывод:

![Version](https://img.shields.io/npm/v/vuepress-theme-hope/next.svg?style=flat-square&logo=npm)
![Downloads](https://img.shields.io/npm/dm/vuepress-theme-hope.svg?style=flat-square&logo=npm)
![Size](https://img.shields.io/bundlephobia/min/vuepress-theme-hope?style=flat-square&logo=npm)

Вы также можете использовать его для создания статических значков. Вы можете настроить текст, стиль, цвет и размер, изменив параметры.

Ввод:

```md
![Theme: vuepress-theme-hope](https://img.shields.io/badge/Theme-vuepress--theme--hope-green.svg?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjEyMDAiIGNsYXNzPSJpY29uIiB2aWV3Qm94PSIwIDAgMzI4MC45NDQgMjgwMCI+CiAgPHBhdGggZD0iTTE2NDUuMzMyIDYwMS4wMDRoMzc1LjY3NUwxMDgxLjgyIDIyMzguNDc4IDE0Mi42MzYgNjAxLjAwNGg3MTguNDc3bDIyMC43MDggMzc5LjcwNCAyMTYuMDEzLTM3OS43MDR6IiBmaWxsPSIjNDFiODgzIiAvPgogIDxwYXRoIGQ9Ik0xNDIuNjM2IDYwMS4wMDRsOTM5LjE4NSAxNjM3LjQ3NCA5MzkuMTg2LTE2MzcuNDc0aC0zNzUuNjc1bC01NjMuNTEgOTgyLjQ4NC01NjguMjA4LTk4Mi40ODR6IiBmaWxsPSIjNDFiODgzIiAvPgogIDxwYXRoIGQ9Ik01MTMuMTg4IDYwMS4wMDRsNTY4LjIwNyA5ODcuMjMgNTYzLjUxMS05ODcuMjNoLTM0Ny40OThsLTIxNi4wMTMgMzc5LjcwNC0yMjAuNzA4LTM3OS43MDR6TTE2MDcuNzkyIDEzMTEuODNsNTk0LjY3OCAyLjI5MyAxODcuMzUzLTMxNi4zMjUtNTk4LjY2MiAyLjI5MnpNMjE5OC41MDYgMTkwOS41N0MyODY3LjQzNiA3MzIuNyAyOTM5LjUwMiA2MDUuNDI2IDI5MzcuODc0IDYwMy43OGMtLjcxNS0uNzIzIDQ1LjMwMy0xLjMxNCAxMDIuMjYyLTEuMzE0czEwMy41NjIuNDI4IDEwMy41NjIuOTUxYzAgLjUyMy0yMDguNTcgMzY3Ljk3OC00NjMuNDkxIDgxNi41NjdMMjIxNi43MTUgMjIzNS42bC0xMDIuMS41OTYtMTAyLjEwMi41OTZ6IiBmaWxsPSIjMzU0OTVlIiAvPgogIDxwYXRoIGQ9Ik0xNjgwLjU2MyAyMjMzLjMyOGMwLTEuMzQgMTY4LjIwOC0yOTguMTQ1IDQ0MC4zNzUtNzc3LjA0OGE0MTM1NjQ1Ljc3NSA0MTM1NjQ1Ljc3NSAwIDAwMzM3LjYxOS01OTQuMTlsMTQ2LjEzLTI1Ny4yNSAxNzAuNzQ2LS4wNCAxNzAuNzQ3LS4wNC01LjUzNiA5Ljc0MWMtMy4wNDQgNS4zNTgtNDMuNzI3IDc3LjMwMi05MC40MDcgMTU5Ljg3NS04NS4zNTYgMTUwLjk5Mi0zMzcuNTYyIDU5NS4xNjMtNjU2LjYwMiAxMTU2LjM3M2wtMTcyIDMwMi41NTktMTcwLjUzNi41ODhjLTkzLjc5NS4zMjItMTcwLjUzNi4wNjktMTcwLjUzNi0uNTY3eiIgZmlsbD0iIzQxYjg4MyIgLz4KICA8cGF0aCBkPSJNMTQyOS43ODMgMTYyNS4zNTFsNTk0LjY3OSAyLjI5MiAxODcuMzUzLTMxNi4zMjQtNTk4LjY2MiAyLjI5MnoiIGZpbGw9IiMzNTQ5NWUiIC8+CiAgPHBhdGggZD0iTTE1MjQuMjA3IDE0NjQuOTAzbDYwOC4yODUgNi44NzcgMTczLjc0Ni0zMjAuOTA5aC02MTkuMDcyeiIgZmlsbD0iIzQxYjg4MyIgLz4KPC9zdmc+)
![Author: Mr.Hope](https://img.shields.io/badge/Author:Mr.Hope-Follow-blue.svg?style=social)
```

Вывод:

![Theme: vuepress-theme-hope](https://img.shields.io/badge/Theme-vuepress--theme--hope-green.svg?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjEyMDAiIGNsYXNzPSJpY29uIiB2aWV3Qm94PSIwIDAgMzI4MC45NDQgMjgwMCI+CiAgPHBhdGggZD0iTTE2NDUuMzMyIDYwMS4wMDRoMzc1LjY3NUwxMDgxLjgyIDIyMzguNDc4IDE0Mi42MzYgNjAxLjAwNGg3MTguNDc3bDIyMC43MDggMzc5LjcwNCAyMTYuMDEzLTM3OS43MDR6IiBmaWxsPSIjNDFiODgzIiAvPgogIDxwYXRoIGQ9Ik0xNDIuNjM2IDYwMS4wMDRsOTM5LjE4NSAxNjM3LjQ3NCA5MzkuMTg2LTE2MzcuNDc0aC0zNzUuNjc1bC01NjMuNTEgOTgyLjQ4NC01NjguMjA4LTk4Mi40ODR6IiBmaWxsPSIjNDFiODgzIiAvPgogIDxwYXRoIGQ9Ik01MTMuMTg4IDYwMS4wMDRsNTY4LjIwNyA5ODcuMjMgNTYzLjUxMS05ODcuMjNoLTM0Ny40OThsLTIxNi4wMTMgMzc5LjcwNC0yMjAuNzA4LTM3OS43MDR6TTE2MDcuNzkyIDEzMTEuODNsNTk0LjY3OCAyLjI5MyAxODcuMzUzLTMxNi4zMjUtNTk4LjY2MiAyLjI5MnpNMjE5OC41MDYgMTkwOS41N0MyODY3LjQzNiA3MzIuNyAyOTM5LjUwMiA2MDUuNDI2IDI5MzcuODc0IDYwMy43OGMtLjcxNS0uNzIzIDQ1LjMwMy0xLjMxNCAxMDIuMjYyLTEuMzE0czEwMy41NjIuNDI4IDEwMy41NjIuOTUxYzAgLjUyMy0yMDguNTcgMzY3Ljk3OC00NjMuNDkxIDgxNi41NjdMMjIxNi43MTUgMjIzNS42bC0xMDIuMS41OTYtMTAyLjEwMi41OTZ6IiBmaWxsPSIjMzU0OTVlIiAvPgogIDxwYXRoIGQ9Ik0xNjgwLjU2MyAyMjMzLjMyOGMwLTEuMzQgMTY4LjIwOC0yOTguMTQ1IDQ0MC4zNzUtNzc3LjA0OGE0MTM1NjQ1Ljc3NSA0MTM1NjQ1Ljc3NSAwIDAwMzM3LjYxOS01OTQuMTlsMTQ2LjEzLTI1Ny4yNSAxNzAuNzQ2LS4wNCAxNzAuNzQ3LS4wNC01LjUzNiA5Ljc0MWMtMy4wNDQgNS4zNTgtNDMuNzI3IDc3LjMwMi05MC40MDcgMTU5Ljg3NS04NS4zNTYgMTUwLjk5Mi0zMzcuNTYyIDU5NS4xNjMtNjU2LjYwMiAxMTU2LjM3M2wtMTcyIDMwMi41NTktMTcwLjUzNi41ODhjLTkzLjc5NS4zMjItMTcwLjUzNi4wNjktMTcwLjUzNi0uNTY3eiIgZmlsbD0iIzQxYjg4MyIgLz4KICA8cGF0aCBkPSJNMTQyOS43ODMgMTYyNS4zNTFsNTk0LjY3OSAyLjI5MiAxODcuMzUzLTMxNi4zMjQtNTk4LjY2MiAyLjI5MnoiIGZpbGw9IiMzNTQ5NWUiIC8+CiAgPHBhdGggZD0iTTE1MjQuMjA3IDE0NjQuOTAzbDYwOC4yODUgNi44NzcgMTczLjc0Ni0zMjAuOTA5aC02MTkuMDcyeiIgZmlsbD0iIzQxYjg4MyIgLz4KPC9zdmc+)
![Author: Mr.Hope](https://img.shields.io/badge/Author:Mr.Hope-Follow-blue.svg?style=social)

::: info

Подробные параметры и способы использования смотрите на [Домашней странице](https://shields.io/).

:::

## Markmap

Markmap — это инструмент для преобразования Markdown в интеллект-карты. Он поддерживает больше форматов и контента, чем встроенная блок-схема темы.

1. Используйте [Markmap](https://markmap.js.org/) для создания HTML-файла интеллект-карты
1. Поместите файл HTML в папку `.vuepress/public/`
1. Вставить в Markdown через `<iframe>`

Ввод:

```html
<iframe
  :src="$withBase('/markmap/demo.html')"
  width="100%"
  height="400"
  frameborder="0"
  scrolling="No"
  leftmargin="0"
  topmargin="0"
/>
```

Вывод:

<!-- markdownlint-disable -->

<iframe :src="$withBase('/markmap/demo.html')" width="100%" height="400" frameborder="0" scrolling="No" leftmargin="0" topmargin="0" />

<!-- markdownlint-restore -->

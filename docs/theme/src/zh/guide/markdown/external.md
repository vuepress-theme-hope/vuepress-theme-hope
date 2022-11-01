---
title: 外部引入
icon: link
order: -1
category:
  - Markdown
tag:
  - Markdown
---

除了在 Markdown 内部使用新语法来增强内容外，你也可以使用 `<iframe>` 或 `<img>` 从外部引入链接来增强你的 Markdown 内容。

<!-- more -->

## shields.io

你可以使用 [shields.io](https://shields.io/) 生成大量的动态勋章，比如项目的 Stars，NPM 版本号，下载量等。

输入:

```md
![Version](https://img.shields.io/npm/v/vuepress-theme-hope/next.svg?style=flat-square&logo=npm)
![Downloads](https://img.shields.io/npm/dm/vuepress-theme-hope.svg?style=flat-square&logo=npm)
![Size](https://img.shields.io/bundlephobia/min/vuepress-theme-hope?style=flat-square&logo=npm)
![Dependencies](https://img.shields.io/librariesio/release/npm/vuepress-theme-hope?style=flat-square)
```

输出:

![Version](https://img.shields.io/npm/v/vuepress-theme-hope/next.svg?style=flat-square&logo=npm)
![Downloads](https://img.shields.io/npm/dm/vuepress-theme-hope.svg?style=flat-square&logo=npm)
![Size](https://img.shields.io/bundlephobia/min/vuepress-theme-hope?style=flat-square&logo=npm)

当然你可以单纯利用它生成静态的徽章。你可以通过修改参数来定制文字、样式、颜色与大小。

输入:

```md
![Theme: vuepress-theme-hope](https://img.shields.io/badge/主题-vuepress--theme--hope-green.svg?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjEyMDAiIGNsYXNzPSJpY29uIiB2aWV3Qm94PSIwIDAgMzI4MC45NDQgMjgwMCI+CiAgPHBhdGggZD0iTTE2NDUuMzMyIDYwMS4wMDRoMzc1LjY3NUwxMDgxLjgyIDIyMzguNDc4IDE0Mi42MzYgNjAxLjAwNGg3MTguNDc3bDIyMC43MDggMzc5LjcwNCAyMTYuMDEzLTM3OS43MDR6IiBmaWxsPSIjNDFiODgzIiAvPgogIDxwYXRoIGQ9Ik0xNDIuNjM2IDYwMS4wMDRsOTM5LjE4NSAxNjM3LjQ3NCA5MzkuMTg2LTE2MzcuNDc0aC0zNzUuNjc1bC01NjMuNTEgOTgyLjQ4NC01NjguMjA4LTk4Mi40ODR6IiBmaWxsPSIjNDFiODgzIiAvPgogIDxwYXRoIGQ9Ik01MTMuMTg4IDYwMS4wMDRsNTY4LjIwNyA5ODcuMjMgNTYzLjUxMS05ODcuMjNoLTM0Ny40OThsLTIxNi4wMTMgMzc5LjcwNC0yMjAuNzA4LTM3OS43MDR6TTE2MDcuNzkyIDEzMTEuODNsNTk0LjY3OCAyLjI5MyAxODcuMzUzLTMxNi4zMjUtNTk4LjY2MiAyLjI5MnpNMjE5OC41MDYgMTkwOS41N0MyODY3LjQzNiA3MzIuNyAyOTM5LjUwMiA2MDUuNDI2IDI5MzcuODc0IDYwMy43OGMtLjcxNS0uNzIzIDQ1LjMwMy0xLjMxNCAxMDIuMjYyLTEuMzE0czEwMy41NjIuNDI4IDEwMy41NjIuOTUxYzAgLjUyMy0yMDguNTcgMzY3Ljk3OC00NjMuNDkxIDgxNi41NjdMMjIxNi43MTUgMjIzNS42bC0xMDIuMS41OTYtMTAyLjEwMi41OTZ6IiBmaWxsPSIjMzU0OTVlIiAvPgogIDxwYXRoIGQ9Ik0xNjgwLjU2MyAyMjMzLjMyOGMwLTEuMzQgMTY4LjIwOC0yOTguMTQ1IDQ0MC4zNzUtNzc3LjA0OGE0MTM1NjQ1Ljc3NSA0MTM1NjQ1Ljc3NSAwIDAwMzM3LjYxOS01OTQuMTlsMTQ2LjEzLTI1Ny4yNSAxNzAuNzQ2LS4wNCAxNzAuNzQ3LS4wNC01LjUzNiA5Ljc0MWMtMy4wNDQgNS4zNTgtNDMuNzI3IDc3LjMwMi05MC40MDcgMTU5Ljg3NS04NS4zNTYgMTUwLjk5Mi0zMzcuNTYyIDU5NS4xNjMtNjU2LjYwMiAxMTU2LjM3M2wtMTcyIDMwMi41NTktMTcwLjUzNi41ODhjLTkzLjc5NS4zMjItMTcwLjUzNi4wNjktMTcwLjUzNi0uNTY3eiIgZmlsbD0iIzQxYjg4MyIgLz4KICA8cGF0aCBkPSJNMTQyOS43ODMgMTYyNS4zNTFsNTk0LjY3OSAyLjI5MiAxODcuMzUzLTMxNi4zMjQtNTk4LjY2MiAyLjI5MnoiIGZpbGw9IiMzNTQ5NWUiIC8+CiAgPHBhdGggZD0iTTE1MjQuMjA3IDE0NjQuOTAzbDYwOC4yODUgNi44NzcgMTczLjc0Ni0zMjAuOTA5aC02MTkuMDcyeiIgZmlsbD0iIzQxYjg4MyIgLz4KPC9zdmc+)
![Author: Mr.Hope](https://img.shields.io/badge/作者:Mr.Hope-关注-blue.svg?style=social)
```

输出:

![Theme: vuepress-theme-hope](https://img.shields.io/badge/主题-vuepress--theme--hope-green.svg?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjEyMDAiIGNsYXNzPSJpY29uIiB2aWV3Qm94PSIwIDAgMzI4MC45NDQgMjgwMCI+CiAgPHBhdGggZD0iTTE2NDUuMzMyIDYwMS4wMDRoMzc1LjY3NUwxMDgxLjgyIDIyMzguNDc4IDE0Mi42MzYgNjAxLjAwNGg3MTguNDc3bDIyMC43MDggMzc5LjcwNCAyMTYuMDEzLTM3OS43MDR6IiBmaWxsPSIjNDFiODgzIiAvPgogIDxwYXRoIGQ9Ik0xNDIuNjM2IDYwMS4wMDRsOTM5LjE4NSAxNjM3LjQ3NCA5MzkuMTg2LTE2MzcuNDc0aC0zNzUuNjc1bC01NjMuNTEgOTgyLjQ4NC01NjguMjA4LTk4Mi40ODR6IiBmaWxsPSIjNDFiODgzIiAvPgogIDxwYXRoIGQ9Ik01MTMuMTg4IDYwMS4wMDRsNTY4LjIwNyA5ODcuMjMgNTYzLjUxMS05ODcuMjNoLTM0Ny40OThsLTIxNi4wMTMgMzc5LjcwNC0yMjAuNzA4LTM3OS43MDR6TTE2MDcuNzkyIDEzMTEuODNsNTk0LjY3OCAyLjI5MyAxODcuMzUzLTMxNi4zMjUtNTk4LjY2MiAyLjI5MnpNMjE5OC41MDYgMTkwOS41N0MyODY3LjQzNiA3MzIuNyAyOTM5LjUwMiA2MDUuNDI2IDI5MzcuODc0IDYwMy43OGMtLjcxNS0uNzIzIDQ1LjMwMy0xLjMxNCAxMDIuMjYyLTEuMzE0czEwMy41NjIuNDI4IDEwMy41NjIuOTUxYzAgLjUyMy0yMDguNTcgMzY3Ljk3OC00NjMuNDkxIDgxNi41NjdMMjIxNi43MTUgMjIzNS42bC0xMDIuMS41OTYtMTAyLjEwMi41OTZ6IiBmaWxsPSIjMzU0OTVlIiAvPgogIDxwYXRoIGQ9Ik0xNjgwLjU2MyAyMjMzLjMyOGMwLTEuMzQgMTY4LjIwOC0yOTguMTQ1IDQ0MC4zNzUtNzc3LjA0OGE0MTM1NjQ1Ljc3NSA0MTM1NjQ1Ljc3NSAwIDAwMzM3LjYxOS01OTQuMTlsMTQ2LjEzLTI1Ny4yNSAxNzAuNzQ2LS4wNCAxNzAuNzQ3LS4wNC01LjUzNiA5Ljc0MWMtMy4wNDQgNS4zNTgtNDMuNzI3IDc3LjMwMi05MC40MDcgMTU5Ljg3NS04NS4zNTYgMTUwLjk5Mi0zMzcuNTYyIDU5NS4xNjMtNjU2LjYwMiAxMTU2LjM3M2wtMTcyIDMwMi41NTktMTcwLjUzNi41ODhjLTkzLjc5NS4zMjItMTcwLjUzNi4wNjktMTcwLjUzNi0uNTY3eiIgZmlsbD0iIzQxYjg4MyIgLz4KICA8cGF0aCBkPSJNMTQyOS43ODMgMTYyNS4zNTFsNTk0LjY3OSAyLjI5MiAxODcuMzUzLTMxNi4zMjQtNTk4LjY2MiAyLjI5MnoiIGZpbGw9IiMzNTQ5NWUiIC8+CiAgPHBhdGggZD0iTTE1MjQuMjA3IDE0NjQuOTAzbDYwOC4yODUgNi44NzcgMTczLjc0Ni0zMjAuOTA5aC02MTkuMDcyeiIgZmlsbD0iIzQxYjg4MyIgLz4KPC9zdmc+)
![Author: Mr.Hope](https://img.shields.io/badge/作者:Mr.Hope-关注-blue.svg?style=social)

::: info

详细的参数与使用请见 [首页](https://shields.io/)。

:::

## Markmap

Markmap 是一个将 Markdown 转换为思维导图的工具。它相对于主题内置的 flowchart 支持更多的格式与内容。

1. 使用 [Markmap](https://markmap.js.org/) 生成思维导图 HTML 文件
1. 将 HTML 文件放在 `.vuepress/public/` 下
1. 通过 `<iframe>` 插入到 Markdown

输入:

```html
<iframe
  :src="$withBase('/markmap/demo-zh.html')"
  width="100%"
  height="400"
  frameborder="0"
  scrolling="No"
  leftmargin="0"
  topmargin="0"
/>
```

输出:

<!-- markdownlint-disable -->

<iframe :src="$withBase('/markmap/demo-zh.html')" width="100%" height="400" frameborder="0" scrolling="No" leftmargin="0" topmargin="0" />

<!-- markdownlint-restore -->

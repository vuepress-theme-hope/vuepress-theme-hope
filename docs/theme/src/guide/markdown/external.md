---
title: External import
icon: link
order: -1
category:
  - Markdown
tag:
  - Markdown
---

To using new syntax inside Markdown to enhance content, you can also use `<iframe>` or `<img>` to import external links to enhance your Markdown content.

<!-- more -->

## shields.io

You can use [shields.io](https://shields.io/) to generate lots of dynamic badges, such as the project’s Stars, npm version number, downloads, etc.

Input:

```md
![Version](https://img.shields.io/npm/v/vuepress-theme-hope/next.svg?style=flat-square&logo=npm)
![Downloads](https://img.shields.io/npm/dm/vuepress-theme-hope.svg?style=flat-square&logo=npm)
![Size](https://img.shields.io/bundlephobia/min/vuepress-theme-hope?style=flat-square&logo=npm)
![Dependencies](https://img.shields.io/librariesio/release/npm/vuepress-theme-hope?style=flat-square)
```

Output:

![Version](https://img.shields.io/npm/v/vuepress-theme-hope/next.svg?style=flat-square&logo=npm)
![Downloads](https://img.shields.io/npm/dm/vuepress-theme-hope.svg?style=flat-square&logo=npm)
![Size](https://img.shields.io/bundlephobia/min/vuepress-theme-hope?style=flat-square&logo=npm)

You can also use it to generate static badges. You can customize the text, style, color and size by modifying the parameters.

Input:

```md
![Theme: vuepress-theme-hope](https://img.shields.io/badge/Theme-vuepress--theme--hope-green.svg?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjEyMDAiIGNsYXNzPSJpY29uIiB2aWV3Qm94PSIwIDAgMzI4MC45NDQgMjgwMCI+CiAgPHBhdGggZD0iTTE2NDUuMzMyIDYwMS4wMDRoMzc1LjY3NUwxMDgxLjgyIDIyMzguNDc4IDE0Mi42MzYgNjAxLjAwNGg3MTguNDc3bDIyMC43MDggMzc5LjcwNCAyMTYuMDEzLTM3OS43MDR6IiBmaWxsPSIjNDFiODgzIiAvPgogIDxwYXRoIGQ9Ik0xNDIuNjM2IDYwMS4wMDRsOTM5LjE4NSAxNjM3LjQ3NCA5MzkuMTg2LTE2MzcuNDc0aC0zNzUuNjc1bC01NjMuNTEgOTgyLjQ4NC01NjguMjA4LTk4Mi40ODR6IiBmaWxsPSIjNDFiODgzIiAvPgogIDxwYXRoIGQ9Ik01MTMuMTg4IDYwMS4wMDRsNTY4LjIwNyA5ODcuMjMgNTYzLjUxMS05ODcuMjNoLTM0Ny40OThsLTIxNi4wMTMgMzc5LjcwNC0yMjAuNzA4LTM3OS43MDR6TTE2MDcuNzkyIDEzMTEuODNsNTk0LjY3OCAyLjI5MyAxODcuMzUzLTMxNi4zMjUtNTk4LjY2MiAyLjI5MnpNMjE5OC41MDYgMTkwOS41N0MyODY3LjQzNiA3MzIuNyAyOTM5LjUwMiA2MDUuNDI2IDI5MzcuODc0IDYwMy43OGMtLjcxNS0uNzIzIDQ1LjMwMy0xLjMxNCAxMDIuMjYyLTEuMzE0czEwMy41NjIuNDI4IDEwMy41NjIuOTUxYzAgLjUyMy0yMDguNTcgMzY3Ljk3OC00NjMuNDkxIDgxNi41NjdMMjIxNi43MTUgMjIzNS42bC0xMDIuMS41OTYtMTAyLjEwMi41OTZ6IiBmaWxsPSIjMzU0OTVlIiAvPgogIDxwYXRoIGQ9Ik0xNjgwLjU2MyAyMjMzLjMyOGMwLTEuMzQgMTY4LjIwOC0yOTguMTQ1IDQ0MC4zNzUtNzc3LjA0OGE0MTM1NjQ1Ljc3NSA0MTM1NjQ1Ljc3NSAwIDAwMzM3LjYxOS01OTQuMTlsMTQ2LjEzLTI1Ny4yNSAxNzAuNzQ2LS4wNCAxNzAuNzQ3LS4wNC01LjUzNiA5Ljc0MWMtMy4wNDQgNS4zNTgtNDMuNzI3IDc3LjMwMi05MC40MDcgMTU5Ljg3NS04NS4zNTYgMTUwLjk5Mi0zMzcuNTYyIDU5NS4xNjMtNjU2LjYwMiAxMTU2LjM3M2wtMTcyIDMwMi41NTktMTcwLjUzNi41ODhjLTkzLjc5NS4zMjItMTcwLjUzNi4wNjktMTcwLjUzNi0uNTY3eiIgZmlsbD0iIzQxYjg4MyIgLz4KICA8cGF0aCBkPSJNMTQyOS43ODMgMTYyNS4zNTFsNTk0LjY3OSAyLjI5MiAxODcuMzUzLTMxNi4zMjQtNTk4LjY2MiAyLjI5MnoiIGZpbGw9IiMzNTQ5NWUiIC8+CiAgPHBhdGggZD0iTTE1MjQuMjA3IDE0NjQuOTAzbDYwOC4yODUgNi44NzcgMTczLjc0Ni0zMjAuOTA5aC02MTkuMDcyeiIgZmlsbD0iIzQxYjg4MyIgLz4KPC9zdmc+)
![Author: Mr.Hope](https://img.shields.io/badge/Author:Mr.Hope-Follow-blue.svg?style=social)
```

Output:

![Theme: vuepress-theme-hope](https://img.shields.io/badge/Theme-vuepress--theme--hope-green.svg?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjEyMDAiIGNsYXNzPSJpY29uIiB2aWV3Qm94PSIwIDAgMzI4MC45NDQgMjgwMCI+CiAgPHBhdGggZD0iTTE2NDUuMzMyIDYwMS4wMDRoMzc1LjY3NUwxMDgxLjgyIDIyMzguNDc4IDE0Mi42MzYgNjAxLjAwNGg3MTguNDc3bDIyMC43MDggMzc5LjcwNCAyMTYuMDEzLTM3OS43MDR6IiBmaWxsPSIjNDFiODgzIiAvPgogIDxwYXRoIGQ9Ik0xNDIuNjM2IDYwMS4wMDRsOTM5LjE4NSAxNjM3LjQ3NCA5MzkuMTg2LTE2MzcuNDc0aC0zNzUuNjc1bC01NjMuNTEgOTgyLjQ4NC01NjguMjA4LTk4Mi40ODR6IiBmaWxsPSIjNDFiODgzIiAvPgogIDxwYXRoIGQ9Ik01MTMuMTg4IDYwMS4wMDRsNTY4LjIwNyA5ODcuMjMgNTYzLjUxMS05ODcuMjNoLTM0Ny40OThsLTIxNi4wMTMgMzc5LjcwNC0yMjAuNzA4LTM3OS43MDR6TTE2MDcuNzkyIDEzMTEuODNsNTk0LjY3OCAyLjI5MyAxODcuMzUzLTMxNi4zMjUtNTk4LjY2MiAyLjI5MnpNMjE5OC41MDYgMTkwOS41N0MyODY3LjQzNiA3MzIuNyAyOTM5LjUwMiA2MDUuNDI2IDI5MzcuODc0IDYwMy43OGMtLjcxNS0uNzIzIDQ1LjMwMy0xLjMxNCAxMDIuMjYyLTEuMzE0czEwMy41NjIuNDI4IDEwMy41NjIuOTUxYzAgLjUyMy0yMDguNTcgMzY3Ljk3OC00NjMuNDkxIDgxNi41NjdMMjIxNi43MTUgMjIzNS42bC0xMDIuMS41OTYtMTAyLjEwMi41OTZ6IiBmaWxsPSIjMzU0OTVlIiAvPgogIDxwYXRoIGQ9Ik0xNjgwLjU2MyAyMjMzLjMyOGMwLTEuMzQgMTY4LjIwOC0yOTguMTQ1IDQ0MC4zNzUtNzc3LjA0OGE0MTM1NjQ1Ljc3NSA0MTM1NjQ1Ljc3NSAwIDAwMzM3LjYxOS01OTQuMTlsMTQ2LjEzLTI1Ny4yNSAxNzAuNzQ2LS4wNCAxNzAuNzQ3LS4wNC01LjUzNiA5Ljc0MWMtMy4wNDQgNS4zNTgtNDMuNzI3IDc3LjMwMi05MC40MDcgMTU5Ljg3NS04NS4zNTYgMTUwLjk5Mi0zMzcuNTYyIDU5NS4xNjMtNjU2LjYwMiAxMTU2LjM3M2wtMTcyIDMwMi41NTktMTcwLjUzNi41ODhjLTkzLjc5NS4zMjItMTcwLjUzNi4wNjktMTcwLjUzNi0uNTY3eiIgZmlsbD0iIzQxYjg4MyIgLz4KICA8cGF0aCBkPSJNMTQyOS43ODMgMTYyNS4zNTFsNTk0LjY3OSAyLjI5MiAxODcuMzUzLTMxNi4zMjQtNTk4LjY2MiAyLjI5MnoiIGZpbGw9IiMzNTQ5NWUiIC8+CiAgPHBhdGggZD0iTTE1MjQuMjA3IDE0NjQuOTAzbDYwOC4yODUgNi44NzcgMTczLjc0Ni0zMjAuOTA5aC02MTkuMDcyeiIgZmlsbD0iIzQxYjg4MyIgLz4KPC9zdmc+)
![Author: Mr.Hope](https://img.shields.io/badge/Author:Mr.Hope-Follow-blue.svg?style=social)

::: info

For detailed parameters and usage, please see [Home](https://shields.io/).

:::

## Markmap

Markmap is a tool for converting Markdown into mind maps. It supports more format and content than the built-in flowchart of the theme.

1. Use [Markmap](https://markmap.js.org/) to generate mind map HTML file
1. Place the HTML file under `.vuepress/public/`
1. Insert into Markdown via `<iframe>`

Input:

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

Output:

<!-- markdownlint-disable -->

<iframe :src="$withBase('/markmap/demo.html')" width="100%" height="400" frameborder="0" scrolling="No" leftmargin="0" topmargin="0" />

<!-- markdownlint-restore -->

---
title: 最后更新时间
icon: time
category: feature
tags:
  - feature
  - last update
---

vuepress-theme-hope 通过内置 `@mr-hope/vuepress-plugin-last-update` 插件，实现了页面最后更新时间的自动生成。

默认情况下，页面的更新时间会通过页面文件文件最后一次 `git` 提交的 UNIX 时间戳 (ms) 来自动生成，并将以合适的日期格式显示在每一页的底部。

<!-- more -->

::: warning

由于最后更新时间是基于 `git` 的, 所以你只能在一个基于 `git` 的项目中启用它。此外，由于使用的时间戳来自 git commit，因此它将仅在给定页的第一次提交之后显示，并且仅在该页面后续提交更改时更新。

:::

有些时候你的站点可能通过 CI 自动部署，而这些 CI 服务器的时间可能基于 UTC，这会导致生成的时间不同于你所在的时区，在这种情况下，你可以设置 `themeConfig.lastUpdate.timezone` 来指定你所在的时区。

::: info 时区列表

详细的时区列表，详见 [时区列表](https://www.zeitverschiebung.net/cn/all-time-zones.html)

:::

主题会使用 `dayjs` 自动根据当前语言，本地化最后更新时间的表述文字。如果你对默认的显示文字不满意，你可以设置自己的时间转换函数到 `themeConfig.lastUpdate.transformer`。函数的格式为 `(timestamp: number, lang: string) => string`

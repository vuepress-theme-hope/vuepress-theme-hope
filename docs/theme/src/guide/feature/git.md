---
title: Git info
icon: time
category: feature
tags:
  - feature
  - last update
---

`vuepress-theme-hope` will automatic generate the create time, last update time and contributors of the page through the built-in [`@mr-hope/vuepress-plugin-git`](https://vuepress-theme-hope.github.io/git/) plugin.

By default, the plugin will get the UNIX timestamp(ms) of each file’s fist and last `git` commit for you, and it will also display at the bottom of each page in an appropriate format.

At the same time, all contributors to the page will be displayed at the bottom of the page. If you don’t want to show contributors, please set `themeConfig.git.contributor` to `false`.

<!-- more -->

::: warning

Since the last update time is based on `git`, you can only enable it in a project based on `git`. Since the timestamp used is from git commit, it will only be displayed after the first commit of a given page, and will only be updated when subsequent changes are committed to that page.

:::

Sometimes your site may be automatically deployed through CI, and the time of these CI servers may be based on UTC, which will cause the generated time to be different from your time zone. In this case, you can set `themeConfig.git.timezone` to specify your timezone.

::: info Timezone list

For detailed timezone list, please see [Timezone List](https://www.zeitverschiebung.net/cn/all-time-zones.html)

:::

The theme will use `dayjs` to automatically localize the text of the last update time according to the current language. If you are not satisfied with the default display text, you can set your own time conversion function to `themeConfig.git.transformer`. The format of the function is `(timestamp: number, lang: string) => string`

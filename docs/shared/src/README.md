---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-shared
tagline: Some powerful utils for VuePress2

footer: Theme by <a href="https://theme-hope.vuejs.press" target="_blank">VuePress Theme Hope</a> | MIT Licensed, Copyright © 2019-present Mr.Hope

copyright: false
---

## Install

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-shared@next
```

@tab yarn

```bash
yarn add -D vuepress-shared@next
```

@tab npm

```bash
npm i -D vuepress-shared@next
```

:::

## Usage

::: warning

VuePress is running on both Node.js Side and Browser Side, we called it `node` and `client`.

So you should be aware to import the correct file, as Node.js has build-in modules and has ability to access file system, and browser has global variables like `window` or `navigator`.

:::

- At Node Side, you should import functions from `vuepress-shared/node`.
- At Client Side, you should import functions from `vuepress-shared/client`.

<NetlifyBadge />

<script setup lang="ts">
import NetlifyBadge from "@NetlifyBadge";
</script>

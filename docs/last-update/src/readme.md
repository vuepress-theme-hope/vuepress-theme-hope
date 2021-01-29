---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: "@mr-hope/vuepress-plugin-last-update"
tagline: Last update plugin for vuepress
footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
---

This plugin will use git to inject a readable last update time and a last update time timestamp into the page.

::: tip Why use this plugin

The internationalization support of the official plugin is not good, this plugin provides better multi-language support.

:::

## How to use

### Install

```bash
npm i -D @mr-hope/vuepress-plugin-last-update
```

Or

```bash
yarn add -D @mr-hope/vuepress-plugin-last-update
```

### Usage

```js
// .vuepress/config.js
module.exports = {
  plugins: [["@vuepress/last-updated", false], "@mr-hope/last-update"],
};
```

::: warning

You must disable the official plugin!

:::

## Plugin description

To let the plugin work, your docs should be a git project, the plugin will automatically read the file’s last commit time and inject it into `lastUpdated` in a localized form. At the same time, it will inject a timestamp in `lastUpdatedTime` for use by other plugins.

## Configuration

### timezone

- Type: `string`
- Required: No

Current timezone, useful when you are deploying through CI.

> For timezone list, please see [Timezone list](https://www.zeitverschiebung.net/en/all-time-zones.html)

### transformer

- Type: `(timestamp: number, lang: string) => string`
- Default value: `` `${dayjs(timestamp).format('LL')} ${dayjs(timestamp).format('HH:mm')}` ``

Time conversion function, by default, will use dayjs to automatically localize according to the current page language.

Such as: `2020年5月8日 16:05` `May 8, 2020 16:05`

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

<CodeGroup>
<CodeGroupItem title="yarn">
```bash
yarn add -D @mr-hope/vuepress-plugin-last-update
```
</CodeGroupItem>

<CodeGroupItem title="npm">
```bash
npm i -D @mr-hope/vuepress-plugin-last-update
```
</CodeGroupItem>
</CodeGroup>

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

Sometimes your site may be automatically deployed through CI, and the time of these CI servers may be based on UTC, which will cause the generated time to be different from your time zone. In this case, you can set the `timezone` option to specify you The time zone you are in.

::: info Timezone list

For detailed timezone list, please refer to [Time Zone List](https://www.zeitverschiebung.net/cn/all-time-zones.html)

:::

### transformer

- Type: `(timestamp: number, lang: string) => string`
- Default value: `` `${dayjs(timestamp).format('LL')} ${dayjs(timestamp).format('HH:mm')}` ``

Time conversion function, by default, will use dayjs to automatically localize according to the current page language.

Such as: `2020年5月8日 16:05` `May 8, 2020 16:05`

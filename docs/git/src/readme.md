---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: "@mr-hope/vuepress-plugin-git"
tagline: Git info plugin for vuepress
footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
---

This plugin will use git to inject contributors, createTime and updateTime timestamp into the page. It will also use dayjs to generate localized time text.

## How to use

### Install

<CodeGroup>
<CodeGroupItem title="yarn">

```bash
yarn add -D @mr-hope/vuepress-plugin-git
```

</CodeGroupItem>

<CodeGroupItem title="npm">

```bash
npm i -D @mr-hope/vuepress-plugin-git
```

</CodeGroupItem>
</CodeGroup>

### Usage

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      "@mr-hope/git",
      {
        // your options
      },
    ],
  ],
};
```

</CodeGroupItem>

<CodeGroupItem title="ts">

```ts
// .vuepress/config.ts
export default {
  plugins: [
    [
      "@mr-hope/git",
      {
        // your options
      },
    ],
  ],
};
```

</CodeGroupItem>
</CodeGroup>

## Plugin description

To let the plugin work, your docs should be a git project, the plugin will automatically read the file’s contributors, create and last commit timestamp and inject it into page. It will also use dayjs to generate localized time text.

```ts
interface GitContributor {
  name: string;
  email: string;
  commits: number;
}

interface Page {
  // other keys...

  contributors?: GitContributor[];
  /** Readable create time text in current language */
  createTime?: string;
  createTimeStamp?: number;
  /** Readable time text in current language */
  updateTime?: string;
  updateTimeStamp?: number;
}
```

## Configuration

### contributor

- Type: `boolean`
- Default: `true`

Whether generate contributor info

### timezone

- Type: `string`
- Required: No

Sometimes your site may be automatically deployed through CI, and the time of these CI servers may be based on UTC, which will cause the generated time to be different from your time zone. In this case, you can set the `timezone` option to specify you The time zone you are in.

::: info Timezone list

For detailed timezone list, please see [Time Zone List](https://www.zeitverschiebung.net/cn/all-time-zones.html)

:::

### transformer

- Type: `(timestamp: number, lang: string) => string`
- Default value: `` `${dayjs(timestamp).format('LL')} ${dayjs(timestamp).format('HH:mm')}` ``

Time conversion function, by default, will use dayjs to automatically localize according to the current page language.

Such as: `2020年5月8日 16:05` `May 8, 2020 16:05`

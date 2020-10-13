---
home: true
title: "@mr-hope/vuepress-plugin-last-update"
icon: homefill
heroImage: /logo.svg
heroText: "@mr-hope/vuepress-plugin-last-update"
tagline: 最后更新时间插件
footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyright: false
---

这个插件将会利用 Git 的日志向 page 注入可阅读的最后更新时间文字与最后更新时间的时间戳。

::: tip 为什么使用本插件
官方插件的国际化支持并不良好，本插件提供了更为优秀的多语言支持。
:::

## 使用插件

### 安装

```bash
npm i -D vuepress-plugin-last-update
```

或

```bash
yarn add -D vuepress-plugin-last-update
```

### 使用

```js {3}
// .vuepress/config.js
module.exports = {
  plugin: [["@vuepress/last-updated", false], "@mr-hope/last-update"],
};
```

::: warning
你必须禁用官方插件
:::

## 插件说明

该插件基于 Git，会自动读取文件的上一次提交时间，并以本地化的形式，注入到 `lastUpdated` 上，同时，会将时间戳注入到 `lastUpdatedTime` 上，以供其他插件使用。

## 配置

### transformer

- 类型: `(timestamp: number, lang: string) => string`
- 默认值: `` `${dayjs(timestamp).format('LL')} ${dayjs(timestamp).format('HH:mm')}` ``

时间转换函数，默认情况下，会使用 dayjs 自动根据当前页面语言进行本地化。

如: `2020年5月8日 16:05` `May 8, 2020 16:05`

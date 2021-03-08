---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: "@mr-hope/vuepress-plugin-git"
tagline: Git 信息插件
footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
---

这个插件将会利用 Git 向 page 注入页面的贡献者与创建时间、最后更新时间的时间戳，同时还会使用 dayjs 生成本地化的时间文字。

## 使用插件

### 安装

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

### 使用

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

## 插件说明

该插件基于 Git，会自动读取文件的创建时间、上一次提交时间与贡献者，并注入到 page 上。同时，还会使用 dayjs 本地化时间，生成可阅读的时间文字。

## 配置

### contributor

- 类型: `boolean`
- 默认值: `true`

是否生成贡献者信息。

### timezone

- 类型: `string`
- 必填: 否

有些时候你的站点可能通过 CI 自动部署，而这些 CI 服务器的时间可能基于 UTC，这会导致生成的时间不同于你所在的时区，在这种情况下，你可以设置 `timezone` 选项 来指定你所在的时区。

::: info 时区列表

详细的时区列表，详见 [时区列表](https://www.zeitverschiebung.net/cn/all-time-zones.html)

:::

### transformer

- 类型: `(timestamp: number, lang: string) => string`
- 默认值: `` `${dayjs(timestamp).format('LL')} ${dayjs(timestamp).format('HH:mm')}` ``

时间转换函数，默认情况下，会使用 dayjs 自动根据当前页面语言进行本地化。

如: `2020年5月8日 16:05` `May 8, 2020 16:05`

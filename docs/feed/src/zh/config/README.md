---
title: 插件配置
icon: config
---

## hostname

- 类型: `string`
- 必填: 是

部署网站的域名。

## channel

`channel` 选项用于配置 Feed 频道。

可用选项详见 [配置 → 频道设置](channel.md)

## filter

- 类型: `(pageA: Page)=> boolean`
- 默认值: 全部 feed 项目

自定义的过滤函数，用于过滤哪些项目在 feed 中显示。

## sort

- 类型: `(pageA: Page, pageB: page)=> number`

自定义排序函数，用于对站点中的页面进行排序。

最终生成的 feed 文件将会按照这个顺序对项目进行显示。

::: warning

强烈建议设置这个选项，否则 feed 流中，项目的顺序完全由 VuePress 默认输出的 pages 顺序决定。

你可以按照自己的需求对站点内的页面进行排序。

:::

## count

- 类型: `number`
- 默认值: 全部 feed 项目数量

设置 feed 的最大项目数量。设置后会在所有页面排序好后，截取前 count 个项目。

如果你的站点文章很多，你可能需要考虑设置这个选项以减少 feed 文件大小。

## output

Feed 的输出配置。

### output.atom.enable

- 类型: `boolean`
- 默认值: `true`

是否启用 Atom 输出

### output.atom.path

- 类型: `string`
- 默认值: `atom.xml`

Atom Feed 输出文件位置(基于输出文件夹)

### output.json.enable

- 类型: `boolean`
- 默认值: `true`

是否启用 json 输出

### output.json.path

- 类型: `string`
- 默认值: `feed.json`

JSON Feed 输出文件位置(基于输出文件夹)

### output.rss.enable

- 类型: `boolean`
- 默认值: `true`

是否启用 RSS 输出

### output.rss.path

- 类型: `string`
- 默认值: `rss.xml`

RSS 输出文件位置(基于输出文件夹)

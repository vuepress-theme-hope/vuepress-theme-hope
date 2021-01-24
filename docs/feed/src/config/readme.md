---
title: Plugin Config
icon: config
---

## hostname

- Type: `string`
- Required: Yes

The domain name of the deployment website.

## baseLang

- Type: `string`
- Default: `'en-US'`

The language of the home directory.

## channel

`channel` option is used to config _Feed Channels_.

For available options, please see [Config → Channel](channel.md)

## filter

- Type: `(pageA: Page)=> boolean`
- Default: All feed items

A custom filter funciton, used to filter feed items.

## sort

- Type: `(pageA: Page, pageB: page)=> number`

A custom sort function, used to sort feed items.

The final feed items will be the same squence.

::: warning

We strongly recommend you to set this option, otherwise the order of items in the feed stream is completely determined by the order of pages output by vuepress.

You can sort the pages in the site according to your needs.

:::

## count

- Type: `number`
- Default: All feed items count

设置 feed 的最大项目数量。设置后会在所有页面排序好后，截取前 count 个项目。

如果你的站点文章很多，你可能需要考虑设置这个选项以减少 feed 文件大小。

## output

Feed output configuration

### output.atom.enable

- Type: `boolean`
- Default: `true`

Whether enable Atom output

### output.atom.path

- Type: `string`
- Default: `atom.xml`

Atom Feed output location

### output.json.enable

- Type: `boolean`
- Default: `true`

Whether enable JSON output

### output.json.path

- Type: `string`
- Default: `feed.json`

JSON Feed output location

### output.rss.enable

- Type: `boolean`
- Default: `true`

Whether enable RSS output

### output.rss.path

- Type: `string`
- Default: `rss.xml`

RSS Feed output location

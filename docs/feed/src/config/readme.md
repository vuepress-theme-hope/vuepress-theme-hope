---
title: Plugin Config
icon: config
---

## hostname

- Type: `string`
- Required: Yes

The domain name of the deployment site.

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

We strongly recommend you to set this option, otherwise the order of items in the feed stream is completely determined by the order of pages output by VuePress.

You can sort the pages in the site according to your needs.

:::

## count

- Type: `number`
- Default: All feed items count

Set the maximum number of items in the feed. After setting, after all pages are sorted, the first `count` items will be intercepted.

If your site has a lot of articles, you may want to consider setting this option to reduce the feed file size.

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

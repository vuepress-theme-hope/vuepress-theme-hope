---
title: Plugin Config
icon: config
---

## hostname

- Type: `string`
- Required: Yes

The domain name of the deployment site.

## atom

- Type: `boolean`
- Default: `false`

Whether to output Atom syntax files.

## json

- Type: `boolean`
- Default: `false`

Whether output JSON syntax files.

## rss

- Type: `boolean`
- Default: `false`

Whether to output RSS syntax files.

## image

- Type: `string`

A large image/icon of the feed, probably used as banner.

## icon

- Type: `string`

A small icon of the feed, probably used as favicon.

## count

- Type: `number`
- Default: `100`

Set the maximum number of items in the feed. After all pages are sorted, the first `count` items will be intercepted.

If your site has a lot of articles, you may consider this option to reduce feed file size.

## customElements

- Type: `string[]`
- Default: `["ExternalLinkIcon"]`

Custom element or component which should be removed in feed.

## filter

- Type: `(page: Page)=> boolean`
- Default:

  ```ts
  ({ frontmatter, filePathRelative }: Page): boolean =>
    !(
      frontmatter.home ||
      !filePathRelative ||
      frontmatter.article === false ||
      frontmatter.feed === false
    );
  ```

A custom filter function, used to filter feed items.

## sort

- Type: `(pageA: Page, pageB: Page)=> number`

A custom sort function, used to sort feed items.

::: warning

We strongly recommend you setting this option, otherwise the order of items in the feed stream is completely determined by the order of pages output by VuePress.

You can sort the pages in the site according to your needs.

:::

## channel

`channel` option is used to config _Feed Channels_.

For available options, please see [Config → Channel](channel.md)

## atomOutputFilename

- Type: `string`
- Default: `atom.xml`

Atom syntax output filename, relative to output directory.

## jsonOutputFilename

- Type: `string`
- Default: `feed.json`

JSON syntax output filename, relative to output directory.

## rssOutputFilename

- Type: `string`
- Default: `rss.xml`

RSS syntax output filename, relative to output directory.

## getter

Feed generation controller.

::: tip

The plugin is providing a reasonable getter by default, if you want full control of feed generating, you can set this field.

:::

For details, see [Feed Getter](./getter.md).

## locales

- Type: `Record<string, BaseFeedOptions>`
- Required: No

You can use it to specific options for each locale.

Any options above are supported except `hostname`.

---
title: Feed Plugin Config
icon: rss
order: 5
category:
  - Config
tag:
  - Feed
  - Plugin Config
  - Theme Config
---

## Intro

`vuepress-theme-hope` provides feed generation support via the `vuepress-plugin-feed2` plugin. It passes `plugins.feed` in theme options as plugin options to `vuepress-plugin-feed2` plugin.

The `vuepress-plugin-feed2` plugin can generate feed files in the following three formats for you:

- Atom 1.0
- JSON 1.1
- RSS 2.0

::: tip Please use RSS if possible. Atom and JSON are only provided for best compatibility.

:::

Please enable the plugin by setting `atom`, `json` or `rss` to `true` in `plugins.feed` according to the format you want to generate.

::: info

See the <ProjectLink name="feed2" path="/config/">feed2 plugin documentation</ProjectLink> for more details.

:::

## Plugin Options

### atom

- Type: `boolean`
- Default: `false`

Whether to output Atom syntax files.

### json

- Type: `boolean`
- Default: `false`

Whether output JSON syntax files.

### rss

- Type: `boolean`
- Default: `false`

Whether to output RSS syntax files.

### image

- Type: `string`

A large image/icon of the feed, probably used as banner.

### icon

- Type: `string`

A small icon of the feed, probably used as favicon.

### count

- Type: `number`
- Default: `1000`

Set the maximum number of items in the feed. After all pages are sorted, the first `count` items will be intercepted.

If your site has a lot of articles, you may consider this option to reduce feed file size.

### preservedElements

- Type: `(RegExp | string)[] | (tagName: string) => boolean`
- Default: `[]`

Custom element or component which should be preserved in feed.

::: note

By default, all unknown tags will be removed.

:::

### filter

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

### sort

- Type: `(pageA: Page, pageB: Page)=> number`

A custom sort function, used to sort feed items.

::: warning

We strongly recommend you setting this option, otherwise the order of items in the feed stream is completely determined by the order of pages output by VuePress.

You can sort the pages in the site according to your needs.

:::

### channel

`channel` option is used to config _Feed Channels_.

For available options, please see <ProjectLink name="feed2" path="/config/channel.html">Config → Channel</ProjectLink>.

### atomOutputFilename

- Type: `string`
- Default: `atom.xml`

Atom syntax output filename, relative to output directory.

### jsonOutputFilename

- Type: `string`
- Default: `feed.json`

JSON syntax output filename, relative to output directory.

### rssOutputFilename

- Type: `string`
- Default: `rss.xml`

RSS syntax output filename, relative to output directory.

### getter

Feed generation controller.

::: tip

The plugin is providing a reasonable getter by default, if you want full control of feed generating, you can set this field.

:::

For details, see <ProjectLink name="feed2" path="/config/getter.html">Feed Getter</ProjectLink>.

### locales

- Type: `Record<string, BaseFeedOptions>`
- Required: No

You can use it to specific options for each locale.

Any options above are supported except `hostname`.

---
title: Feed Plugin Config
icon: rss
order: 8
category:
  - Config
tag:
  - Feed
  - Plugin Config
  - Theme Config
---

## Intro

The theme can generate feeds via `@vuepress/plugin-feed`, and you need to **manually install the plugin** before using.

You can enable this feature by setting `plugins.feed` to `true` in theme options. This default behavior generates RSS format feeds for you.

## Plugin Options

The theme passes `plugins.feed` in theme options as plugin options to `@vuepress/plugin-feed` plugin.

You can pass your own options with `plugins.feed`, here are some common ones:

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

### count

- Type: `number`
- Default: `100`

Set the maximum number of items in the feed. After all pages are sorted, the first `count` items will be intercepted.

If your site has a lot of articles, you may consider this option to reduce feed file size.

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

Custom sorter function for feed items.

The default sorting behavior is by file adding time coming from git (needs `@vuepress/plugin-git`).

::: info

Check [feed plugin documentation][feed-config] for all available options.

:::

[feed-config]: https://ecosystem.vuejs.press/plugins/feed/

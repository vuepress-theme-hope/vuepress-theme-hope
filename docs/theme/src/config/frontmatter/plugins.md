---
title: Plugin Frontmatter Config
icon: puzzle-piece
order: 3
category:
  - Config
tag:
  - Frontmatter
  - Layout
---

You can configure the following options in the frontmatter of the page to control plugin behavior.

## Options for `@vuepress/plugin-copyright`

### copy.triggerLength

- Type: `number`
- Default: `100`

Min words triggering copyright append

### copy.disableCopy

- Type: `boolean`
- Default: `false`

Disable copy

### copy.disableSelection

- Type: `boolean`
- Default: `false`

Disable selection

## Options for `@vuepress/plugin-feed`

### feed.title

- Type: `string`

The title of the feed item

### feed.description

- Type: `string`

Description of the feed item

### feed.content

- Type: `string`

The content of the feed item

### feed.author

- Type: `FeedAuthor[] | FeedAuthor`

The author of the feed item

::: details FeedAuthor format

```ts
interface FeedAuthor {
  /**
   * Author name
   */
  name?: string;

  /**
   * Author email
   */
  email?: string;

  /**
   * Author site
   *
   * @description json format only
   */
  url?: string;

  /**
   * Author avatar
   *
   * @description json format only
   */
  avatar?: string;
}
```

:::

### feed.contributor

- Type: `FeedContributor[] | FeedContributor`

Contributors to feed item

::: details FeedContributor format

```ts
interface FeedContributor {
  /**
   * Author name
   */
  name?: string;

  /**
   * Author email
   */
  email?: string;

  /**
   * Author site
   *
   * @description json format only
   */
  url?: string;

  /**
   * Author avatar
   *
   * @description json format only
   */
  avatar?: string;
}
```

:::

### feed.guid

- Type: `string`

The identifier of feed item, used to identify the feed item.

::: note

You should make sure this is globally unique.

:::

## Options for `@vuepress/sitemap`

### sitemap.changefreq

- Type: `"always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"`
- Default: `"daily"`

Page default update frequency. This will override changefreq in Plugin Options.

### sitemap.exclude

- Type: `boolean`
- Default: `false`

Whether exclude the page from sitemap

### sitemap.priority

- Type: `number`
- Default: `0.5`

Page priority, range from `0` to `1`.

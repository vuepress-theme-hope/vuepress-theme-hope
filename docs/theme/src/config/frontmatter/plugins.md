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

::: fields
@`copy.triggerLength` type=number default=`100`

Min words triggering copyright append.

@`copy.disableCopy` type=boolean

Disable copy.

@`copy.disableSelection` type=boolean

Disable selection.

:::

## Options for `@vuepress/plugin-feed`

:::: fields
@`feed.title` type=string

The title of the feed item.

@`feed.description` type=string

Description of the feed item.

@`feed.content` type=string

The content of the feed item.

@`feed.author` type=`FeedAuthor[] | FeedAuthor`

The author of the feed item.

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

@`feed.contributor` type=`FeedContributor[] | FeedContributor`

Contributors to feed item.

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

@`feed.guid` type=string

The identifier of feed item, used to identify the feed item.

::: note

You should make sure this is globally unique.

:::

::::

## Options for `@vuepress/sitemap`

::: fields
@`sitemap.changefreq` type=`"always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"` default=`"daily"`

Page default update frequency. This will override changefreq in Plugin Options.

@`sitemap.exclude` type=boolean

Whether exclude the page from sitemap.

@`sitemap.priority` type=number default=`0.5`

Page priority, range from `0` to `1`.

:::

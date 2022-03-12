---
title: Page information
icon: info
category:
  - Feature
tag:
  - Feature
  - Page Info
---

By including [`@mr-hope/vuepress-plugin-components`][components], `vuepress-theme-hope` can display article information for you.

<!-- more -->

## Enable

Page information display is enabled globally by default, while supports page config. You can disable it by setting `pageInfo: false` in frontmatter of a specific page.

To keep it globally disabled, please set `pageInfo` to `false` in the plugin options. Then you can set `pageInfo` in frontmatter of a specific page to enable it locally.

## Parameters <Badge text="Support page config" />

`pageInfo` accepts an array of strings by default, filling in a group of items. The order of filling is the order in which the items are displayed.

The optional values and corresponding contents of the entry are as follows:

| Entry           | Corresponding content  | page frontmatter value                |
| --------------- | ---------------------- | ------------------------------------- |
| `"Author"`      | author                 | `author`                              |
| `"Date"`        | Writing Date           | `time`                                |
| `"Original"`    | Whether is original    | `isOriginal`                          |
| `"Category"`    | Category               | `category`                            |
| `"Tag"`         | tags                   | `tags`                                |
| `"ReadingTime"` | Estimated reading time | N/A (automatically generated)         |
| `"Word"`        | Word count             | N/A (automatically generated)         |
| `"PageView"`    | Visits                 | `pageview` (only available in Waline) |

By default it will display "Author, Visit Number, Writing Date, Category, Tags, Expect Reading Time".

### author <Badge text="Support page config" />

Example:

```md
---
author: Mr.Hope
---
```

You can configure `author` in the plugin options to set the default author. And you can also configure `author` in frontmatter with a new value in the page to override the default author, or set it to `false` to cancel the author display.

Authors support `string[]`, `string`, `AuthorInfo` and `AuthorInfo[]`.

The format of AuthorInfo is as follows:

```ts
interface AuthorInfo {
  name: string;
  url?: string;
}
```

### Writing time

We recommended to fill it with a standard date format. A standard format is in the form of `xxxx-xx-xx`, such as "April 1, 2020" should be written as `2020-04-01`.

Example:

```md
---
date: 2020-01-01
---
```

### Category and Tags

See [blog section](../blog/category-and-tags.md) for details

### Reading time

The default statistic method is 300 words per minute. You can override it by setting `themeConfig.plugins.readingTime.wordPerMinute`. This option does not support individual configuration on the page.

### View Count <Badge text="Support page config" />

When using Waline as [Comment Service](comment.md), this function is enabled by default.

Example:

```md
---
pageview: false
---
```

[components]: https://vuepress-theme-hope.github.io/v2/components/

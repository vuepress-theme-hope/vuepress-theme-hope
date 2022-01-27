---
title: Page information
icon: info
---

## Props

```ts
interface PageInfoProps {
  /**
   * Default author
   */
  defaultAuthor?: string;

  /**
   * Page Info display configuration
   *
   * @default ['author', 'visitor', 'time', 'category', 'tag', 'reading-time']
   */
  items?: PageInfo[] | false;

  /**
   * Path to navigate when clicking category label
   *
   * `$category` will be automatically replaced by currect category name
   */
  categoryPath?: string;

  /**
   * Path to navigate when clicking tag label
   *
   * `$tag` will be automatically replaced by currect tag name
   */
  tagPath?: string;

  /**
   * Whether display icon besides title
   *
   * @default false
   */

  titleIcon?: boolean;

  /**
   * Title icon prefix
   */
  titleIconPrefix?: string;
}
```

### items

`pageInfo` accepts an array of strings, which you should fill in a group of items. The order of you fill is the order in which the items are displayed.

The available values and related page information are as follows:

| Value            | PageInfo               | Related Fontmatter property        |
| ---------------- | ---------------------- | ---------------------------------- |
| `'author'`       | author                 | `author`                           |
| `'time'`         | Writing Date           | `time`                             |
| `'category'`     | Category               | `category`                         |
| `'tag'`          | tags                   | `tags`                             |
| `'reading-time'` | Estimated reading time | N / A (automatically generated)    |
| `'word'`         | Word count             | N / A (automatically generated)    |
| `'visitor'`      | Pageviews              | `visitor` (Vssue does not support) |

By default it will display "Author, Visit Number, Writing Date, Category, Tags, Expect Reading Time".

::: tip Other notes

- **author**

  You can configure `author` in the plugin options to set the default author. And you can also configure `author` in frontmatter with a new value in the page to override the default author, or set it to `false` to cancel the author display.

- **time**

  We recommend filling in a standard date format. A standard format is in the form of `xxxx-xx-xx`. (E.g.: "April 1, 2020" should be written as `2020-04-01`).

- **reading time**

  By default, the reading speed is 300 words per minute. You can override it by setting `wordPerminute` in the plugin options.

:::

## Enable and disable

The `<PageInfo />` component is enabled globally by default. You can disable it by setting `pageInfo: false` in page frontmatter.

To keep it globally disabled, please set `pageInfo` to `false` in the plugin options. Then you can set `pageInfo` in page frontmattaer to enable it locally.

## Original Marker

You can set `original` to `true` in page frontmatter to add an original mark in page info.
